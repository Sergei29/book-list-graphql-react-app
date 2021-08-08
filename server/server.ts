import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import dotenv from "dotenv";
import { connectMongoDB } from "./mongoDB/mongoDB";
import { arrMiddleware, corsOptions } from "./middleware/middleware";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema/schema";
import { funcVerifyToken } from "./util/auth";
import { dataSources } from "./datasources";
import { TokenPayloadType } from "./types";

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
  context: ({ req, res, connection }) => {
    let user: TokenPayloadType | null = null;

    if (connection && connection?.context) {
      user = connection.context.user || null;
    }

    /**
     * @description decode request cookie token to get user data, set it into context
     */
    if (req && req.cookies.token) {
      const userDecodedData = funcVerifyToken(req.cookies.token);
      user = userDecodedData as TokenPayloadType;
    }
    return { user, res };
  },
});

apolloServer.applyMiddleware({
  app: app as any,
  path: "/graphql",
  cors: corsOptions,
});

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
