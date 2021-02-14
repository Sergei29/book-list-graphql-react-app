import expressJwt from "express-jwt";
import bodyParser from "body-parser";
import cors from "cors";
import { jwtSecret } from "../routes/login/login";

const arrMiddleware = [
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    algorithms: ["Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64"],
    credentialsRequired: false,
  }),
];

export { arrMiddleware };
