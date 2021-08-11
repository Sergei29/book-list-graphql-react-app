import { Document } from "mongoose";
import express from "express";
import { DataSourcesType } from "../datasources";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Expiry {
  IN_1_HOUR = 60 * 60 * 1000,
  IN_24_HOURS = 60 * 60 * 24 * 1000,
  IN_7_DAYS = 60 * 60 * 24 * 7 * 1000,
}

export type EmailContentType = {
  subject: string;
  text: string;
  html: string;
};

export type TokenPayloadType = {
  email?: string;
  role?: Role;
} & Record<string, any>;

export type ContextType = {
  user: null | TokenPayloadType;
  res: express.Response<any, Record<string, any>>;
  dataSources: DataSourcesType;
};

export type UserType = {
  id: string;
  email: string;
  hash?: string;
  role?: Role;
  active?: boolean;
} & Document;

export type BookType = {
  name: string;
  genre: string;
  authorId: string;
  addedBy: string;
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
  USER_ALREADY_ACTIVE = "User already activated.",
  USER_NOT_FOUND = "User does not exist.",
  LOGIN_REQUIRED = "Please login again.",
  WRONG_PASSWORD = "Wrong password.",
}
