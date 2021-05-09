import { BookType } from "./bookType";

export type AuthorType = {
  id: string;
  age?: number;
  books?: BookType[];
};
