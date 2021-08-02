import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, AuthorType } from "../types/types";

export class AuthorsDataSource extends MongoDataSource<
  AuthorType,
  ContextType
> {
  getAllAuthors = async () => await this.model.find();

  getAuthorById = async (strAuthorId: string) =>
    await this.findOneById(strAuthorId);

  saveAndGetDocFromDB = async (objNewAuthor: Record<string, any>) => {
    try {
      return await this.model.create(objNewAuthor);
    } catch (error) {
      throw new Error(error);
    }
  };

  addNewAuthor = async (objNewAuthor: Record<string, any>) =>
    await this.saveAndGetDocFromDB(objNewAuthor);

  updateAuthorById = async (objNewAuthor: Record<string, any>) => {
    try {
      const { id, ...restAuthorData } = objNewAuthor;
      await this.model.findByIdAndUpdate(id, { ...restAuthorData });
      const objUpdatedAuthor = await this.findOneById(id);
      return objUpdatedAuthor;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteAuthorById = async (strAuthorId: string) => {
    try {
      await this.deleteFromCacheById(strAuthorId);
      return await this.model.findByIdAndDelete(strAuthorId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
