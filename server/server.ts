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
// allow CORS cross-origin requests:
app.use(arrMiddleware);
const port = process.env.PORT || 4000; // when we deploy on heroku - it sets PORT env variable for us.

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

// GraphQL server:
const typeDefs = gql(
  fs.readFileSync("./server/schema/schema.graphql", { encoding: "utf8" })
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

// authentication service (currently - REST instead the GraphQL):
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
