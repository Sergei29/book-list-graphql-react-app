import bodyParser from "body-parser";
import cors from "cors";

/**
 * @description middlewares list aplicable to express app
 */
const arrMiddleware = [cors(), bodyParser.json()];

export { arrMiddleware };
