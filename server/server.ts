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

const app = express();
app.use(arrMiddleware);

/**
 * @description when we deploy on heroku - it sets PORT env variable for us.
 */
const port = process.env.PORT || 4000;

/**
 * @description initialise MongoDB connection
 */
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => {
    console.log("Error connecting to DB: ", error.message);
  });

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

const typeDefs = gql(
  fs.readFileSync("./server/schema/schema.graphql", { encoding: "utf8" })
);

/**
 * @description initialise GraphQL server and apply express middleware:
 */
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

/**
 * @description serve react app client in production mode
 * indicate the path to static files and,
 * for every/all incoming get requests: serve react app index.html
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "..", "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "client/build", "index.html")
    );
  });
}

/**
 * @description authentication service (currently - REST instead the GraphQL)
 */
app.post("/login", loginRouter);

/**
 * @description error handling
 */
app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({ message: error.message });
});

/**
 * @description server listen, for dev mode log the message.
 */
app.listen(port, () => {
  console.log(
    `server running on http://localhost:${port}, GraphQL server at http://localhost:${port}/graphql`
  );
});
