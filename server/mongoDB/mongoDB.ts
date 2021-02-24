import Mongoose from "mongoose";

let database: Mongoose.Connection;

/**
 * @description initialise MongoDB connection
 * @returns {undefined} sets connection
 */
export const connectMongoDB = () => {
  const uri = process.env.MONGO_URI!;
  if (database) return;

  Mongoose.connect(uri, {
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
