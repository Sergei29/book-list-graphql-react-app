import {
  AuthorsDataSource,
  BooksDataSource,
  UsersDataSource,
  ImagesDataSource,
} from "./index";
import { Author, Book, User, Image } from "../models";

export type DataSourcesType = {
  authors: InstanceType<typeof AuthorsDataSource>;
  books: InstanceType<typeof BooksDataSource>;
  users: InstanceType<typeof UsersDataSource>;
  images: InstanceType<typeof ImagesDataSource>;
};

/**
 * @description datasources for existing entities - are classes that Apollo Server can use to encapsulate fetching data from a particular source, such as a database or a REST API. These classes help handle caching, deduplication, and errors while resolving operations
 */
export const dataSources = () => ({
  authors: new AuthorsDataSource(Author),
  books: new BooksDataSource(Book),
  users: new UsersDataSource(User),
  images: new ImagesDataSource(Image),
});
