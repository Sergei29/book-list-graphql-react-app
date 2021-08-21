import { IFieldResolver } from "apollo-server-express";
import AuthorsDB from "../models/author";
import { ContextType } from "../types/types";

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type BookResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

export const Book: BookResolverType = {
  author: async (parent, args, ctx, info) =>
    await AuthorsDB.findById(parent.authorId),
  image: async (parent, args, ctx, info) => {
    const strImageId = parent.imageId;
    const { images } = ctx.dataSources;

    const nObjImage = (await images.getImageById(strImageId)) || null;
    return nObjImage;
  },
};
