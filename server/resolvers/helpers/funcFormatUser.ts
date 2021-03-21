import { UserType } from "../../types/types";

/**
 * @description formats user object to have `id` property
 * @param {Object} objUser user object received from DB
 * @returns {Object} formatted user object
 */
const funcFormatUser = (objUser: UserType) => {
  const objFormatted = objUser.toObject();
  return { ...objFormatted, id: objFormatted._id };
};

export default funcFormatUser;
