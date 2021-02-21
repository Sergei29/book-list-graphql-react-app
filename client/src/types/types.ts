import { Book, Author } from "../generated/graphql";

export type BookType = Book;

export type AuthorType = Author;

export type MaybeArrBooks = (Book | null)[] | undefined | null;

export type MaybeArrAuthors = (Author | null)[] | undefined | null;

export type ValidationType = {
  bIsValid: boolean;
  nstrErrorMessage: string | null;
};

export type AddBookFormStateType = {
  name: string;
  genre: string;
  authorId: string;
};
