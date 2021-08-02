import { AuthorsDataSource, BooksDataSource, UsersDataSource } from "./index";
import { Author, Book, User } from "../models";

export type DataSourcesType = {
  authors: InstanceType<typeof AuthorsDataSource>;
  books: InstanceType<typeof BooksDataSource>;
  users: InstanceType<typeof UsersDataSource>;
};

export const dataSources = () => ({
  authors: new AuthorsDataSource(Author),
  books: new BooksDataSource(Book),
  users: new UsersDataSource(User),
});
