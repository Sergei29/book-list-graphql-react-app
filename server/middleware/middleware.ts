import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://reading-list-react-graphql.herokuapp.com";

export const corsOptions = {
  credentials: true,
  origin,
};

/**
 * @description middlewares list aplicable to express app
 */
const arrMiddleware = [
  cors({
    ...corsOptions,
  }),
  cookieParser(),
];

export { arrMiddleware };
