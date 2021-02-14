import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
