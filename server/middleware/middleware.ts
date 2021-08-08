import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_OPTIONS } from "../constants";

/**
 * @description middlewares list aplicable to express app
 */
const arrMiddleware = [
  cors({
    ...CORS_OPTIONS,
  }),
  cookieParser(),
];

export { arrMiddleware };
