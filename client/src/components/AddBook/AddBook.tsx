import React from "react";
import { AuthorType } from "../../types/types";
import { useForm } from "./hooks/useForm";
import { TimesCircle } from "@styled-icons/fa-regular";
// styles:
import { useStyles } from "./style";

type Props = {
  funcHideForm: () => void;
  nstrSelectedBookId: null | string;
};
/**
 * @description add new book form
 * @returns {JSX} component markup
 */
const AddBook: React.FC<Props> = ({ funcHideForm, nstrSelectedBookId }) => {
  const classes = useStyles();
  const {
    objFormValidaton,
    objAddBookMutationResponse,
    objAuthorsQueryResponse,
    objBook,
    handleSubmit,
    handleChange,
  } = useForm(nstrSelectedBookId);

  const {
    error: objMutationError,
    loading: bMutationLoading,
  } = objAddBookMutationResponse;

  /**
   * @description display authors select options
   * @returns {JSX} markup
   */
  const displayAuthors = () => {
    const { data, loading, error } = objAuthorsQueryResponse;

    if (loading) return <option>loading authors...</option>;
    if (error) return <option>no authors.</option>;
    if (!data) return <option>no authors.</option>;

    if (data!.authors) {
      return data!.authors.map((objAuthor: AuthorType | null) => (
        <option value={objAuthor!.id} key={objAuthor!.id}>
          {objAuthor!.name}
        </option>
      ));
    }
  };

  return (
    <form id="add-book" onSubmit={handleSubmit} className={classes.addBookForm}>
      {objFormValidaton.nstrErrorMessage && (
        <span className={classes.addBookForm__errorMessage}>
          {objFormValidaton.nstrErrorMessage}
        </span>
      )}
      {objMutationError && (
        <span className={classes.addBookForm__errorMessage}>
          {objMutationError.message}
        </span>
      )}
      <TimesCircle
        onClick={funcHideForm}
        size="25"
        title="close the form"
        className={classes.addBookForm__closeButton}
      />
      <div className={classes.addBookForm__formControl}>
        <label className={classes.addBookForm__formControl__label}>
          Book name:
        </label>
        <input
          type="text"
          name="name"
          value={objBook.name}
          onChange={handleChange}
          className={classes.addBookForm__formControl__inputText}
        />
      </div>

      <div className={classes.addBookForm__formControl}>
        <label className={classes.addBookForm__formControl__label}>
          Genre:
        </label>
        <input
          type="text"
          name="genre"
          value={objBook.genre}
          onChange={handleChange}
          className={classes.addBookForm__formControl__inputText}
        />
      </div>

      <div className={classes.addBookForm__formControl}>
        <label className={classes.addBookForm__formControl__label}>
          Author:
        </label>
        <select
          name="authorId"
          onChange={handleChange}
          value={objBook.authorId}
          className={classes.addBookForm__formControl__inputSelect}
        >
          <option value="">Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button
        className={classes.addBookForm__submitButton}
        type="submit"
        disabled={!objFormValidaton.bIsValid || bMutationLoading}
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
