import { Document } from "mongoose";

export type UserType = {
  username: string;
  password: string;
} & Document;

export type DatabaseDocType = Document;
