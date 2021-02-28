import {
  IResolvers,
  AuthenticationError,
  UserInputError,
} from "apollo-server-express";
import BooksDB from "../models/book";
import AuthorsDB from "../models/author";
import UsersDB from "../models/user";
import {
  getToken,
  encryptPassword,
  comparePassword,
} from "../config/authUtils";
import { ErrorMessage } from "../types/types";

type ObjType = Record<string, any>;

const resolvers: IResolvers = {
  Query: {
    book: async (parent: ObjType, args: ObjType) =>
      await BooksDB.findById(args.id),
    author: async (parent: ObjType, args: ObjType) =>
      await AuthorsDB.findById(args.id),
    books: async () => await BooksDB.find(),
    authors: async () => await AuthorsDB.find(),
    me: (parent, args, context, info) => {
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError(ErrorMessage.LOGIN_REQUIRED);
      }
    },
    users: async () => await UsersDB.find(),
  },

  Book: {
    author: async (root) => await AuthorsDB.findById(root.authorId),
  },

  Author: {
    books: async (root: ObjType) => await BooksDB.find({ authorId: root.id }),
  },

  Mutation: {
    addAuthor: async (parent: ObjType, args: ObjType) => {
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

    addBook: async (parent: ObjType, args: ObjType) => {
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

    removeAuthor: async (parent: ObjType, args: ObjType) => {
      const objExistingAuthor = await AuthorsDB.findById(args.id);
      if (!objExistingAuthor) {
        throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
      }

      // 1. remove all author's books (if any)
      await BooksDB.deleteMany({ authorId: args.id });
      // 2. remove Author:
      return await AuthorsDB.findByIdAndDelete(args.id);
    },

    removeBook: async (parent: ObjType, args: ObjType) => {
      const objExistingBook = await BooksDB.findById(args.id);
      if (!objExistingBook) {
        throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
      }

      return await BooksDB.findByIdAndDelete(args.id);
    },

    editBook: async (parent: ObjType, args: ObjType) => {
      const { id, name, genre, authorId } = args;
      const objExistingBook = await BooksDB.findById(id);
      if (!objExistingBook) {
        throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
      }

      await BooksDB.findByIdAndUpdate(id, { name, genre, authorId });
      return await BooksDB.findById(id);
    },

    editAuthor: async (parent: ObjType, args: ObjType) => {
      const { id, name, age } = args;
      const objExistingAuthor = await AuthorsDB.findById(id);
      if (!objExistingAuthor) {
        throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
      }

      await AuthorsDB.findByIdAndUpdate(id, { name, age });
      return await AuthorsDB.findById(id);
    },

    register: async (parent: ObjType, args: ObjType) => {
      const objNewUser = new UsersDB({
        username: args.username,
        password: await encryptPassword(args.password),
      });

      const objUser = await UsersDB.findOne({ username: args.username });
      if (objUser) throw new AuthenticationError(ErrorMessage.USER_EXISTS);

      try {
        const objRegisteredUser = await objNewUser.save();
        const strToken = getToken(objRegisteredUser.toObject());
        return { ...objRegisteredUser.toObject(), token: strToken };
      } catch (objError) {
        throw objError;
      }
    },

    login: async (parent: ObjType, args: ObjType) => {
      const objUser = await UsersDB.findOne({ username: args.username });
      const bIsMatching = await comparePassword(
        args.password,
        objUser!.password
      );

      if (bIsMatching) {
        const strToken = getToken(objUser!.toObject());
        const objFoundUser = { ...objUser?.toObject(), token: strToken };
        return objFoundUser;
      } else {
        throw new AuthenticationError(ErrorMessage.WRONG_PASSWORD);
      }
    },

    removeUser: async (parent: ObjType, args: ObjType) => {
      const objUser = await UsersDB.findOne({ username: args.username });
      if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

      try {
        const objDeletedUser = await objUser.deleteOne();
        return objDeletedUser.toObject();
      } catch (objError) {
        throw objError;
      }
    },

    editUser: async (parent: ObjType, args: ObjType) => {
      const { id, username, password } = args;
      const objUser = await UsersDB.findById(id);
      if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

      try {
        const strNewPassword = await encryptPassword(password);
        await objUser.updateOne({
          username,
          password: strNewPassword as string,
        });

        return await UsersDB.findById(id);
      } catch (objError) {
        throw objError;
      }
    },
  },
};

export default resolvers;
