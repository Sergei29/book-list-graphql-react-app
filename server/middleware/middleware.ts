import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { CORS_OPTIONS } from "../constants";

/**
 * @description middlewares list aplicable to express app
 */
const arrMiddleware = [
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }),
  cors({
    ...CORS_OPTIONS,
  }),
  cookieParser(),
];

export { arrMiddleware };
