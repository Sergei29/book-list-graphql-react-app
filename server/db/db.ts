import { DataStore } from "notarealdb";
import { User } from "../types/types";

const store = new DataStore("./data");

const db = {
  users: store.collection<User>("users"),
};

export default db;
