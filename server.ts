import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { arrMiddleware } from "./middleware/middleware";
import resolvers from "./resolvers/resolvers";
import { loginRouter } from "./routes/login/login";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const MONGO_URI =
  "mongodb+srv://sergebasangovs:calvi187439@@cluster0-lknea.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
// allow CORS cross-origin requests:
app.use(arrMiddleware);
const port = process.env.PORT || 4000; // when we deploy on heroku - it sets PORT env variable for us.

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

// GraphQL server:
const typeDefs = gql(
  fs.readFileSync("./schema/schema.graphql", { encoding: "utf8" })
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

// run react-app from server in production mode:
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //for every/all incoming get requests: serve react app index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// authentication service:
app.post("/login", loginRouter);

// error handling:
app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({ message: error.message });
});

// server run:
app.listen(port, () => {
  console.log(
    `server running on http://localhost:${port}, GraphQL server at http://localhost:${port}/graphql`
  );
});
