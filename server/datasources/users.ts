import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, UserType } from "../types/types";

/**
 * @description datasource class for users entity
 * further info on datasources: https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export class UsersDataSource extends MongoDataSource<UserType, ContextType> {
  /**
   * @description returns the users list
   * @returns {Promise<Array>} promise resolving to an array of users's objects
   */
  getAllUsers = async () => await this.model.find();

  /**
   * @description returns an user by a given ID
   * @param {String} strUserId user's ID
   * @returns {Promise<Object>} promise resolving to user's object
   */
  getUserById = async (strUserId: string) => await this.findOneById(strUserId);

  /**
   * @description returns an user by a given username
   * @param {String} strUsername user's username
   * @returns {Promise<Object>} promise resolving to user's object
   */
  getUserByUsername = async (strUsername: string) =>
    await this.model.findOne({ username: strUsername });

  /**
   * @description util to save user's data in DB
   * @param {Object} objNewUser user's data
   * @returns {Promise<Object>}  promise resolving to newly written user's object
   */
  saveAndGetDocFromDB = async (objNewUser: Record<string, any>) => {
    try {
      return await this.model.create(objNewUser);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description add new user to collection
   * @param {Object} objNewUser user's data
   * @returns {Promise<Object>}  promise resolving to newly written user's object
   */
  addNewUser = async (objNewUser: Record<string, any>) =>
    await this.saveAndGetDocFromDB(objNewUser);

  /**
   * @description updating an exiting user inside the collection
   * @param {Object} objNewUser user's new data
   * @returns {Promise<Object | null>}  promise resolving to re-written user's object
   */
  updateUserById = async (objNewUser: Record<string, any>) => {
    try {
      const { id, ...restUserData } = objNewUser;
      await this.model.findByIdAndUpdate(id, { ...restUserData });
      return await this.model.findOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description delete an existing user from collection
   * @param {String} strUserId user's ID
   * @returns {Promise<Object | null>}  promise resolving to deleted user's data
   */
  deleteUserById = async (strUserId: string) => {
    try {
      await this.deleteFromCacheById(strUserId);
      return await this.model.findByIdAndDelete(strUserId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
