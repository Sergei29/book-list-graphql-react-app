import mongoose, { Schema } from "mongoose";
import { ImageType } from "../types/types";

const imageSchema = new Schema({
  id: String,
  imageUrl: String,
  width: Number,
  height: Number,
  size: Number,
});

/**
 * @description MongoDB/mongoose data model for Image entity
 */
const Image = mongoose.model<ImageType>("Image", imageSchema);

export default Image;
