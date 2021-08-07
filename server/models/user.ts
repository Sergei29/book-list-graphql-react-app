import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/types";

const userSchema = new Schema({
  username: String,
  password: String,
});

/**
 * @description MongoDB/mongoose data model for User entity
 */
const User = mongoose.model<UserType>("User", userSchema);

export default User;
