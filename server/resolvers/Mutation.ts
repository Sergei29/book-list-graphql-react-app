import {
  IFieldResolver,
  AuthenticationError,
  UserInputError,
} from "apollo-server-express";
import { Base64 } from "js-base64";
import { getToken, encryptPassword, comparePassword } from "../util/authUtils";
import funcFormatUser from "../util/funcFormatUser";
import { ErrorMessage, ContextType } from "../types/types";

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type MutationResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

/**
 * @description verify if incoming password is matching
 * @param {String} strGivenPassword incoming
 * @param {String} strStoredPasswor stored
 * @returns {Boolean} matching or not
 */
const funcIsPasswordCorrect = async (
  strGivenPassword: string,
  strStoredPassword: string
) => {
  const strDecodedPassword = Base64.decode(strGivenPassword);
  const bIsMatching = await comparePassword(
    strDecodedPassword,
    strStoredPassword
  );
  return !!bIsMatching;
};

export const Mutation: MutationResolverType = {
  addAuthor: async (parent, args, { dataSources }, info) => {
    const objExistingAuthor = await dataSources.authors.getAuthorByName(
      args.name
    );

    if (objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_EXISTS);
    }

    return await dataSources.authors.addNewAuthor({
      name: args.name,
      age: args.age,
    });
  },

  addBook: async (parent, args, { dataSources }, info) => {
    const objExistingBook = await dataSources.books.getBookByName(args.name);
    if (objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_EXISTS);
    }

    return await dataSources.books.addNewBook({
      name: args.name,
      genre: args.genre,
      authorId: args.authorId,
    });
  },

  removeAuthor: async (parent, args, { dataSources }, info) => {
    const objExistingAuthor = await dataSources.authors.getAuthorById(args.id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }

    // 1. remove all author's books (if any)
    await dataSources.books.deleteBooksByAuthor(args.id);
    // 2. remove Author:
    return await dataSources.authors.deleteAuthorById(args.id);
  },

  removeBook: async (parent, args, { dataSources }, info) => {
    const objExistingBook = await dataSources.books.getBookById(args.id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    return await dataSources.books.deleteBookById(args.id);
  },

  editBook: async (parent, args, { dataSources }, info) => {
    const { id, name, genre, authorId } = args;
    const objExistingBook = await dataSources.books.getBookById(id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    return await dataSources.books.updateBookById({
      id,
      name,
      genre,
      authorId,
    });
  },

  editAuthor: async (parent, args, { dataSources }, info) => {
    const { id, name, age } = args;
    const objExistingAuthor = await dataSources.authors.getAuthorById(id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }

    return await dataSources.authors.updateAuthorById({
      id,
      name,
      age,
    });
  },

  register: async (parent, args, { dataSources }, info) => {
    const objUser = await dataSources.users.getUserByUsername(args.username);
    if (objUser) throw new AuthenticationError(ErrorMessage.USER_EXISTS);
    const strDecodedPassword = Base64.decode(args.password);

    try {
      const objRegisteredUser = await dataSources.users.addNewUser({
        username: args.username,
        password: await encryptPassword(strDecodedPassword),
      });
      const objFormatted = funcFormatUser(objRegisteredUser);
      const strToken = getToken(objFormatted);
      return { ...objFormatted, token: strToken };
    } catch (objError) {
      throw objError;
    }
  },

  login: async (parent, args, { dataSources }, info) => {
    const objUser = await dataSources.users.getUserByUsername(args.username);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    const bIsMatching = await funcIsPasswordCorrect(
      args.password,
      objUser.password
    );
    if (!bIsMatching) {
      throw new AuthenticationError(ErrorMessage.WRONG_PASSWORD);
    }

    const objFormatted = funcFormatUser(objUser);
    const strToken = getToken(objFormatted);
    const objFoundUser = {
      ...objFormatted,
      token: strToken,
    };
    return objFoundUser;
  },

  removeUser: async (parent, args, { dataSources }, info) => {
    const objUser = await dataSources.users.getUserByUsername(args.username);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const objDeletedUser = await dataSources.users.deleteUserById(objUser.id);
      return funcFormatUser(objDeletedUser!);
    } catch (objError) {
      throw objError;
    }
  },

  editUser: async (parent, args, { dataSources }, info) => {
    const { id, username, password } = args;
    const objUser = await dataSources.users.getUserByUsername(username);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const strNewPassword = await encryptPassword(password);
      const objUpdatedUser = await dataSources.users.updateUserById({
        id,
        username,
        password: strNewPassword as string,
      });

      return funcFormatUser(objUpdatedUser!);
    } catch (objError) {
      throw objError;
    }
  },
};
