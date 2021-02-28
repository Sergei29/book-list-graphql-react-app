import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/types";

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
