import { Author } from "./authorType";

export type ImageType = {
  id: string;
  imageUrl: string;
};

export type Book = {
  id: string;
  name?: string;
  genre?: string;
  author?: Author;
  addedBy?: string;
  image?: null | ImageType;
  description?: null | string;
};
