import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, BookType } from "../types";
import { ApolloError } from "apollo-server";

/**
 * @description datasource class for books entity
 * further info on datasources: https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export class BooksDataSource extends MongoDataSource<BookType, ContextType> {
  /**
   * @description returns the books list
   * @returns {Promise<Array>} promise resolving to an array of book's objects
   */
  getAllBooks = async () => await this.model.find();

  /**
   * @description returns an book by a given ID
   * @param {String} strBookId book's ID
   * @returns {Promise<Object>} promise resolving to book's object
   */
  getBookById = async (strBookId: string) => await this.findOneById(strBookId);

  /**
   * @description returns a list of books by associated author's ID
   * @param {String} strAuthorId author's ID
   * @returns {Promise<Object[]>} promise resolving to a list of book's
   */
  getBooksByAuthorId = async (strAuthorId: string) =>
    await this.findByFields({ authorId: strAuthorId });

  /**
   * @description returns an book by book's name
   * @param {String} strBookName book's name
   * @returns {Promise<Object>} promise resolving to book's object
   */
  getBookByName = async (strBookName: string) =>
    await this.model.findOne({ name: strBookName });

  /**
   * @description util to save book's data in DB
   * @param {Object} objNewBook book's data
   * @returns {Promise<Object>}  promise resolving to newly written book's object
   */
  saveAndGetDocFromDB = async (objNewBook: Record<string, any>) => {
    try {
      return await this.model.create(objNewBook);
    } catch (error: any) {
      throw new ApolloError(
        `Book cannot be saved to Database. ${error.message ?? ""}`
      );
    }
  };

  /**
   * @description add new book to collection
   * @param {Object} objNewBook book's data
   * @returns {Promise<Object>}  promise resolving to newly written book's object
   */
  addNewBook = async (objNewBook: Record<string, any>) => {
    return await this.saveAndGetDocFromDB(objNewBook);
  };

  /**
   * @description updating an exiting book inside the collection
   * @param {Object} objNewBook book's new data
   * @returns {Promise<Object | null>}  promise resolving to re-written book's object
   */
  updateBookById = async (objNewBook: Record<string, any>) => {
    const { name, genre, authorId, id, addedBy, description, imageId } =
      objNewBook;
    try {
      await this.model.findByIdAndUpdate(id, {
        name,
        genre,
        authorId,
        addedBy,
        description,
        imageId,
      });

      return await this.model.findOne({ _id: id });
    } catch (error: any) {
      throw new ApolloError(
        `Book ${name} cannot be updated. ${error.message ?? ""}`
      );
    }
  };

  /**
   * @description delete an existing book from collection
   * @param {String} strBookId book's ID
   * @returns {Promise<Object | null>}  promise resolving to deleted book's data
   */
  deleteBookById = async (strBookId: string) => {
    try {
      await this.deleteFromCacheById(strBookId);
      return await this.model.findByIdAndDelete(strBookId);
    } catch (error: any) {
      throw new ApolloError(
        `Book ${strBookId} cannot be deleted. ${error.message ?? ""}`
      );
    }
  };

  /**
   * @description deleting all books by associated author's ID
   * @param {String} strAuthorId author ID
   * @returns {Promise<Object>} a promise resolving to object bearing info on delete outcome: number of items deleted etc.
   */
  deleteBooksByAuthor = async (strAuthorId: string) => {
    try {
      return await this.model.deleteMany({ authorId: strAuthorId });
    } catch (error: any) {
      throw new ApolloError(
        `Failed to delete all books by author: ${strAuthorId}. ${
          error.message ?? ""
        }`
      );
    }
  };
}
