import Mongoose from "mongoose";
import { MONGO_URI } from "../constants";

let database: Mongoose.Connection;

/**
 * @description initialise MongoDB connection
 * @returns {undefined} sets connection
 */
export const connectMongoDB = () => {
  if (database) return;

  Mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("connected to database.");
  });

  database.on("error", (error) => {
    console.log("Error connecting to DB: ", error.message);
  });
};

/**
 * @description disconnects from DB
 * @returns {undefined}
 */
export const disconnectMongoDB = () => {
  if (!database) return;
  Mongoose.disconnect();
};
