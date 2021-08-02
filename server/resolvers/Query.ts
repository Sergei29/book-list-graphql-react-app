import { IFieldResolver, AuthenticationError } from "apollo-server-express";
import BooksDB from "../models/book";
import AuthorsDB from "../models/author";
import UsersDB from "../models/user";
import { ErrorMessage, ContextType } from "../types/types";

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type QueryResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

export const Query: QueryResolverType = {
  book: async (parent, args, { dataSources }) =>
    await dataSources.books.getBookById(args.id),

  author: async (parent, args) => await AuthorsDB.findById(args.id),

  books: async () => await BooksDB.find(),

  authors: async () => await AuthorsDB.find(),

  me: (parent, args, context, info) => {
    if (context.loggedIn) {
      return context.user;
    } else {
      throw new AuthenticationError(ErrorMessage.LOGIN_REQUIRED);
    }
  },

  user: async (parent, args) => await UsersDB.findById(args.id),

  users: async () => await UsersDB.find(),
};
