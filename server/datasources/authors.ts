import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, AuthorType } from "../types";

/**
 * @description datasource class for authors entity
 * further info on datasources: https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export class AuthorsDataSource extends MongoDataSource<
  AuthorType,
  ContextType
> {
  /**
   * @description returns the authors list
   * @returns {Promise<Array>} promise resolving to an array of author's objects
   */
  getAllAuthors = async () => await this.model.find();

  /**
   * @description returns an author by a given ID
   * @param {String} strAuthorId author's ID
   * @returns {Promise<Object>} promise resolving to author's object
   */
  getAuthorById = async (strAuthorId: string) =>
    await this.findOneById(strAuthorId);

  /**
   * @description returns an author by author's name
   * @param {String} strAuthorName author's name
   * @returns {Promise<Object>} promise resolving to author's object
   */
  getAuthorByName = async (strAuthorName: string) =>
    await this.model.findOne({ name: strAuthorName });

  /**
   * @description util to save author's data in DB
   * @param {Object} objNewAuthor author's data
   * @returns {Promise<Object>}  promise resolving to newly written author's object
   */
  saveAndGetDocFromDB = async (objNewAuthor: Record<string, any>) => {
    try {
      return await this.model.create(objNewAuthor);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description add new author to collection
   * @param {Object} objNewAuthor author's data
   * @returns {Promise<Object>}  promise resolving to newly written author's object
   */
  addNewAuthor = async (objNewAuthor: Record<string, any>) =>
    await this.saveAndGetDocFromDB(objNewAuthor);

  /**
   * @description updating an exiting author inside the collection
   * @param {Object} objNewAuthor author's new data
   * @returns {Promise<Object | null>}  promise resolving to re-written author's object
   */
  updateAuthorById = async (objNewAuthor: Record<string, any>) => {
    try {
      const { id, ...restAuthorData } = objNewAuthor;
      await this.model.findByIdAndUpdate(id, { ...restAuthorData });
      return await this.model.findOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description delete an existing author from collection
   * @param {String} strAuthorId autor's ID
   * @returns {Promise<Object | null>}  promise resolving to deleted author's data
   */
  deleteAuthorById = async (strAuthorId: string) => {
    try {
      await this.deleteFromCacheById(strAuthorId);
      return await this.model.findByIdAndDelete(strAuthorId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
