import express, { Request, Response } from "express";
import mongoose from "mongoose";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import schema from "./schema/schema";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const MONGO_URI =
  "mongodb+srv://sergebasangovs:calvi187439@@cluster0-lknea.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
// allow CORS cross-origin requests:
app.use(cors());
const port = process.env.PORT || 4000; // when we deploy on heroku - it sets PORT env variable for us.

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

// run react-app from server in production mode:
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //for every/all incoming get requests: serve react app index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// hookup GraphQL server:
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// error handling:
app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
