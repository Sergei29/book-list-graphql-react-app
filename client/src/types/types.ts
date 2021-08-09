import React from "react";
import { Author } from "./authorType";
import { Book } from "./bookType";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum MuiSelectedTheme {
  LIGHT = "light",
  DARK = "dark",
}

export type BookType = Book;

export type AuthorType = Author;

export type UserType = {
  id: string;
  email?: string;
  role?: Role;
  active?: boolean;
};

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
  addedBy: string;
};

export type InputChangeEvent = React.ChangeEvent<
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | Record<string, any>
>;
