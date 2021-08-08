import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Base64 } from "js-base64";
import { TokenPayloadType } from "../types";
import { SECRET } from "../constants";

/**
 * @description decode password that was encoded on client
 * @param {String} strBase64Encoded base64 encoded password
 * @returns {String} decoded password value
 */
export const funcDecodeBase64Password = (strBase64Encoded: string) =>
  Base64.decode(strBase64Encoded);

/**
 *@description generate JWT token based on user's info
 * @param {Object} userInfo user info
 * @returns {String} encoded JWT auth token
 */
export const funcCreateToken = (userInfo: Record<string, any>) =>
  JWT.sign(
    { sub: userInfo.id, email: userInfo.email, role: userInfo.role },
    SECRET
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
  JWT.verify(strToken, SECRET);
