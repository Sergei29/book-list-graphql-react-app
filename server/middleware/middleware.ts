import cookieParser from "cookie-parser";
import cors from "cors";

/**
 * @description middlewares list aplicable to express app
 */
const arrMiddleware = [cors(), cookieParser()];

export { arrMiddleware };
