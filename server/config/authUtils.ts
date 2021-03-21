import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const strSecret = process.env.SECRET || "adasdfefdgfgfdgdfgdf3453fdfg";
enum Expiry {
  IN_1_HOUR = 60 * 60 * 1000,
  IN_24_HOURS = 60 * 60 * 24 * 1000,
  IN_7_DAYS = 60 * 60 * 24 * 7 * 1000,
}

/**
 * @description to encrypt the password
 * @param {String} strPassword password value
 * @returns {Promise} promise that resolves to an encrypted hash
 */
export const encryptPassword = (strPassword: string) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (nobjError, strSalt) => {
      if (nobjError) {
        reject(nobjError);
        return false;
      }

      bcrypt.hash(strPassword, strSalt, (nobjError, strHash) => {
        if (nobjError) {
          reject(nobjError);
          return false;
        }
        resolve(strHash);
        return true;
      });
    });
  });

/**
 * @description compare the password and hash
 * @param {String} strPassword password provided
 * @param {String} strHash hash for the password
 * @returns {Promise} promise that resolves to boolean - if match or not
 */
export const comparePassword = (strPassword: string, strHash: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const bIsMatch = await bcrypt.compare(strPassword, strHash);
      resolve(bIsMatch);
      return true;
    } catch (objError) {
      reject(objError);
      return false;
    }
  });

/**
 * @description generates jsonwebtoken
 * @param {String|Object|Buffer} mixedPayload request payload value
 * @returns {String} auth token
 */
export const getToken = (
  mixedPayload: string | Record<string, any> | Buffer
) => {
  const strToken = jwt.sign(mixedPayload, strSecret, {
    expiresIn: Expiry.IN_1_HOUR,
  });
  return strToken;
};

/**
 * @description get logged-in status and payload based on auth token
 * @param {String} strToken auth token
 * @returns {Object} payload and logged-in status
 */
export const getPayload = (strToken: string) => {
  try {
    const mixedPayload = jwt.verify(strToken, strSecret);
    return { loggedIn: true, payload: mixedPayload };
  } catch (objError) {
    return { loggedIn: false };
  }
};
