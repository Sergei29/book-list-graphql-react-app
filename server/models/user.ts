import mongoose, { Schema } from "mongoose";
import { UserType } from "../types";

const userSchema = new Schema({
  email: String,
  hash: String,
  role: String,
  active: Boolean,
});

/**
 * @description MongoDB/mongoose data model for User entity
 */
const User = mongoose.model<UserType>("User", userSchema);

export default User;
