import mongoose, { Schema } from "mongoose";
import { BookType } from "../types/types";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

const Book = mongoose.model<BookType>("Book", bookSchema);

export default Book;
