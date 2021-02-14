import { Router, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import db from "../../db/db";

const loginRouter = Router();
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

/**
 * @description callback on request to `/login` path
 * @param {Object} req requet object
 * @param {Object} res response object
 * @returns {undefined} serving request with response
 */
const proceedLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);

  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
};

loginRouter.post("/", proceedLogin);

export { loginRouter, jwtSecret };
