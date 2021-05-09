import { AuthorType } from "./authorType";

export type BookType = {
  id: string;
  name?: String;
  genre?: String;
  author?: AuthorType;
};
