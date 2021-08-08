import {
  IFieldResolver,
  AuthenticationError,
  UserInputError,
  ApolloError,
} from "apollo-server-express";
import { ErrorMessage, ContextType, Role, Expiry } from "../types/types";
import {
  funcHashPassword,
  funcCreateToken,
  funcVerifyPassword,
  funcDecodeBase64Password,
} from "../util/auth";
import { ADMIN_EMAIL } from "../constants";

const { ADMIN, USER } = Role;

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type MutationResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

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
      addedBy: args.addedBy,
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
    const { id, name, genre, authorId, addedBy } = args;
    const objExistingBook = await dataSources.books.getBookById(id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    return await dataSources.books.updateBookById({
      id,
      name,
      genre,
      authorId,
      addedBy,
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

  signUp: async (parent, { credentials }, { dataSources, res }, info) => {
    const { email, password } = credentials;
    const objUserCredentials = {
      email: email.toLowerCase(),
      password: funcDecodeBase64Password(password),
    };
    const { users } = dataSources;

    const nObjExistingUser = await users.getUserByEmail(
      objUserCredentials.email
    );
    if (nObjExistingUser) throw new ApolloError(ErrorMessage.USER_EXISTS);

    const role = objUserCredentials.email === ADMIN_EMAIL ? ADMIN : USER;

    const hash = funcHashPassword(objUserCredentials.password);
    const objNewUser = await users.addNewUser({
      email: objUserCredentials.email,
      hash,
      role,
    });

    const token = funcCreateToken(objNewUser);
    res.cookie("token", token, { httpOnly: true, maxAge: Expiry.IN_24_HOURS });

    return {
      user: {
        id: objNewUser.id,
        email: objNewUser.email,
        role: objNewUser.role,
      },
    };
  },

  signIn: async (parent, { credentials }, { dataSources, res }, info) => {
    const { email, password } = credentials;
    const objUserCredentials = {
      email: email.toLowerCase(),
      password: funcDecodeBase64Password(password),
    };

    const nObjExistingUser = await dataSources.users.getUserByEmail(
      objUserCredentials.email
    );
    if (!nObjExistingUser) throw new ApolloError(ErrorMessage.USER_NOT_FOUND);

    const bValidPassword = funcVerifyPassword(
      objUserCredentials.password,
      nObjExistingUser.hash!
    );

    if (!bValidPassword) throw new ApolloError(ErrorMessage.WRONG_PASSWORD);

    const token = funcCreateToken(nObjExistingUser);

    /**
     * @description setting set-cookie instruction into the response header
     */
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: Expiry.IN_24_HOURS,
    });

    return {
      user: {
        id: nObjExistingUser.id,
        email: nObjExistingUser.email,
        role: nObjExistingUser.role,
      },
    };
  },

  signOut: async (parent, args, { res }, info) => {
    res.clearCookie("token");
    return { user: undefined };
  },

  userInfo: async (parent, args, { user }, info) => {
    if (user) {
      return {
        user: { id: user.sub, email: user.email, role: user.role },
      };
    }

    return { user: undefined };
  },

  removeUser: async (parent, args, { dataSources }, info) => {
    const objUser = await dataSources.users.getUserById(args.id);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const objDeletedUser = await dataSources.users.deleteUserById(args.id);

      return {
        user: {
          id: objDeletedUser!.id,
          email: objDeletedUser!.email,
          role: objDeletedUser!.role,
        },
      };
    } catch (objError) {
      throw objError;
    }
  },
};
