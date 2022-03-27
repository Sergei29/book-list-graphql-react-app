import mongoose, { Schema } from "mongoose";
import { AuthorType } from "../types";

const authorSchema = new Schema({
  name: String,
  age: Number,
});

/**
 * @description MongoDB/mongoose data model for Author entity
 */
const Author = mongoose.model<AuthorType>("Author", authorSchema);

export default Author;
