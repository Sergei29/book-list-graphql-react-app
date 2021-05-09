import { Book } from "./bookType";

export type Author = {
  id: string;
  name?: string;
  age?: number;
  books?: Book[];
};
