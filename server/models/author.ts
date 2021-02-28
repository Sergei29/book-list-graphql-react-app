import mongoose, { Schema } from "mongoose";
import { AuthorType } from "../types/types";

const authorSchema = new Schema({
  name: String,
  age: Number,
});

const Author = mongoose.model<AuthorType>("Author", authorSchema);

export default Author;
