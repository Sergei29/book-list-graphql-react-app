import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/types";

const userSchema = new Schema({
  email: String,
  hash: String,
  role: String,
});

/**
 * @description MongoDB/mongoose data model for User entity
 */
const User = mongoose.model<UserType>("User", userSchema);

export default User;
