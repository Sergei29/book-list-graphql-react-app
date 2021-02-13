import { Document } from "mongoose";

export type User = {
  id: string;
  email: string;
  password: string;
  companyId: string;
};

export type DatabaseDocType = Document;
