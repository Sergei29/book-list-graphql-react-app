import BooksDB from "../models/book";
import AuthorsDB from "../models/author";

type ObjType = Record<string, any>;

const resolvers = {
  Query: {
    books: () => BooksDB.find(),
    authors: () => AuthorsDB.find(),
  },

  Book: {
    author: (root: ObjType) => AuthorsDB.findById(root.authorId),
  },

  Author: {
    books: (root: ObjType) => BooksDB.find({ authorId: root.id }),
  },
};

export default resolvers;
