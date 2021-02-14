import { IResolvers } from "apollo-server-express";
import BooksDB from "../models/book";
import AuthorsDB from "../models/author";

type ObjType = Record<string, any>;

const resolvers: IResolvers = {
  Query: {
    book: async (_: ObjType, args: ObjType) => await BooksDB.findById(args.id),
    author: async (_: ObjType, args: ObjType) =>
      await AuthorsDB.findById(args.id),
    books: async () => await BooksDB.find(),
    authors: async () => await AuthorsDB.find(),
  },

  Book: {
    author: async (root) => await AuthorsDB.findById(root.authorId),
  },

  Author: {
    books: async (root: ObjType) => await BooksDB.find({ authorId: root.id }),
  },

  Mutation: {
    addAuthor: async (_: ObjType, args: ObjType) => {
      const author = new AuthorsDB({
        name: args.name,
        age: args.age,
      });

      return await author.save();
    },

    addBook: async (_: ObjType, args: ObjType) => {
      const book = new BooksDB({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      });

      return await book.save();
    },

    removeAuthor: async (_: ObjType, args: ObjType) => {
      // 1. remove all author's books (if any)
      await BooksDB.deleteMany({ authorId: args.id });

      // 2. remove Author:
      return await AuthorsDB.findById(args.id);
    },

    removeBook: async (_: ObjType, args: ObjType) => {
      return await BooksDB.findById(args.id);
    },

    editBook: async (_: ObjType, args: ObjType) => {
      const { id, name, genre, authorId } = args;
      await BooksDB.findByIdAndUpdate(id, { name, genre, authorId });
      return await BooksDB.findById(id);
    },

    editAuthor: async (_: ObjType, args: ObjType) => {
      const { id, name, age } = args;
      await AuthorsDB.findByIdAndUpdate(id, { name, age });
      return await AuthorsDB.findById(id);
    },
  },
};

export default resolvers;
