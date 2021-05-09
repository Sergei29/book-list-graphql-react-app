import { Author } from "./authorType";

export type Book = {
  id: string;
  name?: string;
  genre?: string;
  author?: Author;
};
