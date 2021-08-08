import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { connectMongoDB } from "./mongoDB/mongoDB";
import { arrMiddleware } from "./middleware/middleware";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema/schema";
import { funcVerifyToken } from "./util/auth";
import { dataSources } from "./datasources";
import { TokenPayloadType } from "./types";
import { NODE_ENV, PORT, CORS_OPTIONS } from "./constants";

const app = express();
app.use(...arrMiddleware);
connectMongoDB();

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
  cors: CORS_OPTIONS,
});

/**
 * @description serve react app client in production mode
 * indicate the path to static files and,
 * for every/all incoming get requests: serve react app index.html
 */
if (NODE_ENV === "production") {
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
app.listen(PORT, () => {
  console.log(
    `server running on http://localhost:${PORT}, GraphQL server at http://localhost:${PORT}/graphql`
  );
});
