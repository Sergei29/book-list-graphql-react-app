import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, UserType } from "../types/types";

export class UsersDataSource extends MongoDataSource<UserType, ContextType> {
  getAllUsers = async () => await this.model.find();

  getUserById = async (strUserId: string) => await this.findOneById(strUserId);

  getUserByUsername = async (strUsername: string) =>
    await this.model.findOne({ username: strUsername });

  saveAndGetDocFromDB = async (objNewUser: Record<string, any>) => {
    try {
      return await this.model.create(objNewUser);
    } catch (error) {
      throw new Error(error);
    }
  };

  addNewUser = async (objNewUser: Record<string, any>) =>
    await this.saveAndGetDocFromDB(objNewUser);

  updateUserById = async (objNewUser: Record<string, any>) => {
    try {
      const { id, ...restUserData } = objNewUser;
      await this.model.findByIdAndUpdate(id, { ...restUserData });
      return await this.model.findOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteUserById = async (strUserId: string) => {
    try {
      await this.deleteFromCacheById(strUserId);
      return await this.model.findByIdAndDelete(strUserId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
