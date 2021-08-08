import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://reading-list-react-graphql.herokuapp.com";

export const CORS_OPTIONS = {
  credentials: true,
  origin,
};

/**
 * @description when we deploy on heroku - it sets PORT env variable for us.
 */
export const PORT = +(process.env.PORT || 4000);

export const NODE_ENV = process.env.NODE_ENV;

export const MONGO_URI = process.env.MONGO_URI!;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export const SECRET = process.env.SECRET!;
