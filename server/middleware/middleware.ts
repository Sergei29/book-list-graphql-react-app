import bodyParser from "body-parser";
import cors from "cors";

const arrMiddleware = [cors(), bodyParser.json()];

export { arrMiddleware };
