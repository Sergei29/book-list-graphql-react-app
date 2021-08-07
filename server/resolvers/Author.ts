import { IFieldResolver } from "apollo-server-express";
import BooksDB from "../models/book";
import { ContextType } from "../types/types";

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type AuthorResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

export const Author: AuthorResolverType = {
  books: async (parent, args, ctx, info) =>
    await BooksDB.find({ authorId: parent.id }),
};
