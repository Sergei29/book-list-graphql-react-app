import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { connectMongoDB } from "./mongoDB/mongoDB";
import { arrMiddleware } from "./middleware/middleware";
import resolvers from "./resolvers/resolvers";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(arrMiddleware);

/**
 * @description when we deploy on heroku - it sets PORT env variable for us.
 */
const port = process.env.PORT || 4000;

connectMongoDB();

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
 * @description server listen, for dev mode log the message.
 */
app.listen(port, () => {
  console.log(
    `server running on http://localhost:${port}, GraphQL server at http://localhost:${port}/graphql`
  );
});
