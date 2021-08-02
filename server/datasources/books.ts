import { MongoDataSource } from "apollo-datasource-mongodb";
import { ContextType, BookType } from "../types/types";

export class BooksDataSource extends MongoDataSource<BookType, ContextType> {
  getAllBooks = async () => await this.model.find();

  getBookById = async (strBookId: string) => await this.findOneById(strBookId);

  getBookByAuthorId = async (strAuthorId: string) =>
    await this.findByFields({ authorId: strAuthorId });

  saveAndGetDocFromDB = async (objNewBook: Record<string, any>) => {
    try {
      return await this.model.create(objNewBook);
    } catch (error) {
      throw new Error(error);
    }
  };

  addNewBook = async (objNewBook: Record<string, any>) =>
    await this.saveAndGetDocFromDB(objNewBook);

  updateBookById = async (objNewBook: Record<string, any>) => {
    try {
      const { name, genre, authorId, id } = objNewBook;
      await this.model.findByIdAndUpdate(id, { name, genre, authorId });
      const objUpdatedBook = await this.findOneById(id);
      return objUpdatedBook;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteBookById = async (strBookId: string) => {
    try {
      await this.deleteFromCacheById(strBookId);
      return await this.model.findByIdAndDelete(strBookId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
