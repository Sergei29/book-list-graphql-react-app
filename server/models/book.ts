import mongoose, { Schema } from "mongoose";
import { BookType } from "../types/types";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
  addedBy: String,
  imageId: String,
  description: String,
});

/**
 * @description MongoDB/mongoose data model for Book entity
 */
const Book = mongoose.model<BookType>("Book", bookSchema);

export default Book;
