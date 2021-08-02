import {
  IFieldResolver,
  AuthenticationError,
  UserInputError,
} from "apollo-server-express";
import { Base64 } from "js-base64";
import BooksDB from "../models/book";
import AuthorsDB from "../models/author";
import UsersDB from "../models/user";
import { getToken, encryptPassword, comparePassword } from "../util/authUtils";
import funcFormatUser from "../util/funcFormatUser";
import { ErrorMessage, ContextType } from "../types/types";

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type MutationResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

export const Mutation: MutationResolverType = {
  addAuthor: async (parent, args, ctx, info) => {
    const objExistingAuthor = await AuthorsDB.findOne({ name: args.name });
    if (objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_EXISTS);
    }

    const objNewAuthor = new AuthorsDB({
      name: args.name,
      age: args.age,
    });

    return await objNewAuthor.save();
  },

  addBook: async (parent, args, ctx, info) => {
    const objExistingBook = await BooksDB.findOne({ name: args.name });
    if (objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_EXISTS);
    }

    const objNewBook = new BooksDB({
      name: args.name,
      genre: args.genre,
      authorId: args.authorId,
    });

    return await objNewBook.save();
  },

  removeAuthor: async (parent, args, ctx, info) => {
    const objExistingAuthor = await AuthorsDB.findById(args.id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }

    // 1. remove all author's books (if any)
    await BooksDB.deleteMany({ authorId: args.id });
    // 2. remove Author:
    return await AuthorsDB.findByIdAndDelete(args.id);
  },

  removeBook: async (parent, args, ctx, info) => {
    const objExistingBook = await BooksDB.findById(args.id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    return await BooksDB.findByIdAndDelete(args.id);
  },

  editBook: async (parent, args, ctx, info) => {
    const { id, name, genre, authorId } = args;
    const objExistingBook = await BooksDB.findById(id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    await BooksDB.findByIdAndUpdate(id, { name, genre, authorId });
    return await BooksDB.findById(id);
  },

  editAuthor: async (parent, args, ctx, info) => {
    const { id, name, age } = args;
    const objExistingAuthor = await AuthorsDB.findById(id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }

    await AuthorsDB.findByIdAndUpdate(id, { name, age });
    return await AuthorsDB.findById(id);
  },

  register: async (parent, args, ctx, info) => {
    const strDecodedPassword = Base64.decode(args.password);
    const objNewUser = new UsersDB({
      username: args.username,
      password: await encryptPassword(strDecodedPassword),
    });

    const objUser = await UsersDB.findOne({ username: args.username });
    if (objUser) throw new AuthenticationError(ErrorMessage.USER_EXISTS);

    try {
      const objRegisteredUser = await objNewUser.save();
      const objFormatted = funcFormatUser(objRegisteredUser);
      const strToken = getToken(objFormatted);
      return { ...objFormatted, token: strToken };
    } catch (objError) {
      throw objError;
    }
  },

  login: async (parent, args, ctx, info) => {
    const strDecodedPassword = Base64.decode(args.password);
    const objUser = await UsersDB.findOne({ username: args.username });
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);
    const bIsMatching = await comparePassword(
      strDecodedPassword,
      objUser.password
    );

    if (bIsMatching) {
      const objFormatted = funcFormatUser(objUser);
      const strToken = getToken(objFormatted);
      const objFoundUser = {
        ...objFormatted,
        token: strToken,
      };
      return objFoundUser;
    } else {
      throw new AuthenticationError(ErrorMessage.WRONG_PASSWORD);
    }
  },

  removeUser: async (parent, args, ctx, info) => {
    const objUser = await UsersDB.findOne({ username: args.username });
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const objDeletedUser = await objUser.deleteOne();
      return funcFormatUser(objDeletedUser);
    } catch (objError) {
      throw objError;
    }
  },

  editUser: async (parent, args, ctx, info) => {
    const { id, username, password } = args;
    const objUser = await UsersDB.findById(id);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const strNewPassword = await encryptPassword(password);
      await objUser.updateOne({
        username,
        password: strNewPassword as string,
      });

      const objUpdatedUser = await UsersDB.findById(id);
      return funcFormatUser(objUpdatedUser!);
    } catch (objError) {
      throw objError;
    }
  },
};
