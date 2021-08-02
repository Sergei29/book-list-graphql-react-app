import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import dotenv from "dotenv";
import { connectMongoDB } from "./mongoDB/mongoDB";
import { arrMiddleware } from "./middleware/middleware";
import resolvers from "./resolvers/resolvers";
import { typeDefs } from "./schema/schema";
import { getPayload } from "./config/authUtils";
import { dataSources } from "./datasources";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(...arrMiddleware);
connectMongoDB();

/**
 * @description when we deploy on heroku - it sets PORT env variable for us.
 */
const port = process.env.PORT || 4000;

/**
 * @description initialise GraphQL server and apply express middleware:
 */
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    // IMPORTANT: the headers.authorization value must be set on client with the value of received auth token.

    // get the user token from the headers
    const strToken = req.headers.authorization || "";
    // try to retrieve the user based on token received:
    const { payload: user, loggedIn } = getPayload(strToken);

    // add the user to the context:
    return { user, loggedIn };
  },
});
apolloServer.applyMiddleware({ app: app as any, path: "/graphql" });

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
