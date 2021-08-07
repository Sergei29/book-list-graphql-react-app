import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { TokenPayloadType } from "../types";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const strSecret = process.env.SECRET!;

/**
 *@description generate JWT token based on user's info
 * @param {Object} userInfo user info
 * @returns {String} encoded JWT auth token
 */
export const funcCreateToken = (userInfo: Record<string, any>) =>
  JWT.sign(
    { sub: userInfo.id, email: userInfo.email, role: userInfo.role },
    strSecret
  );

/**
 * @description verify incoming password
 * @param {String} strAttemptedPassword incoming password
 * @param {String} strEncodedPassword stored encrypted password
 * @returns {Boolean} matching or not
 */
export const funcVerifyPassword = (
  strAttemptedPassword: string,
  strEncodedPassword: string
) => bcrypt.compareSync(strAttemptedPassword, strEncodedPassword);

/**
 * @description encrypt password
 * @param {String} strPassword not encrypted password
 * @returns {String} encrypted password
 */
export const funcHashPassword = (strPassword: string) =>
  bcrypt.hashSync(strPassword);

/**
 * @description verifies auth token, extracting data encrypted within it
 * @param {String} strToken JWT token
 * @returns {String | Object} decoded user info
 */
export const funcVerifyToken = (strToken: string): TokenPayloadType | string =>
  JWT.verify(strToken, strSecret);
