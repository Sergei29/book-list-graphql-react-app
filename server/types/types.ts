import { Document } from "mongoose";
import { DataSourcesType } from "../datasources";

export type ContextType = {
  user?: string | Record<string, any>;
  loggedIn: boolean;
  dataSources: DataSourcesType;
};

export type UserType = {
  username: string;
  password: string;
} & Document;

export type BookType = {
  name: string;
  genre: string;
  authorId: string;
} & Document;

export type AuthorType = {
  name: string;
  age: number;
} & Document;

export type DatabaseDocType = Document;

export enum ErrorMessage {
  BOOK_EXISTS = "Book already exists.",
  BOOK_NOT_FOUND = "Book does not exist.",
  AUTHOR_EXISTS = "Author already exists.",
  AUTHOR_NOT_FOUND = "Author does not exist.",
  USER_EXISTS = "User already exists.",
  USER_NOT_FOUND = "User does not exist.",
  LOGIN_REQUIRED = "Please login again.",
  WRONG_PASSWORD = "Wrong password.",
}
