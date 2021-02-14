import React from "react";
import { AuthorType } from "../../types/types";
import { useForm } from "./hooks/useForm";
// styles:
import {
  AddBookForm,
  FormControl,
  InputLabel,
  TextInput,
  SelectInput,
  SubmitButton,
  ErrorMessage,
} from "./AddBook.styled";

/**
 * @description add new book form
 * @returns {JSX} component markup
 */
const AddBook = () => {
  const {
    objFormValidaton,
    objAuthorsQueryResponse,
    objBook,
    handleSubmit,
    handleChange,
  } = useForm();

  /**
   * @description display authors select options
   * @returns {JSX} markup
   */
  const displayAuthors = () => {
    const { data, loading, error } = objAuthorsQueryResponse;
    if (loading) return <option>loading authors...</option>;
    if (error) return <option>no authors.</option>;
    if (data.authors) {
      return data.authors.map((objAuthor: AuthorType) => (
        <option value={objAuthor.id} key={objAuthor.id}>
          {objAuthor.name}
        </option>
      ));
    }
  };

  return (
    <AddBookForm id="add-book" onSubmit={handleSubmit}>
      {objFormValidaton.nstrErrorMessage && (
        <ErrorMessage>{objFormValidaton.nstrErrorMessage}</ErrorMessage>
      )}
      <FormControl className="field">
        <InputLabel>Book name:</InputLabel>
        <TextInput
          type="text"
          name="name"
          value={objBook.name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className="field">
        <InputLabel>Genre:</InputLabel>
        <TextInput
          type="text"
          name="genre"
          value={objBook.genre}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className="field">
        <InputLabel>Author:</InputLabel>
        <SelectInput
          name="authorId"
          onChange={handleChange}
          value={objBook.authorId}
        >
          <option value="">Select author</option>
          {displayAuthors()}
        </SelectInput>
      </FormControl>

      <SubmitButton type="submit" disabled={!objFormValidaton.bIsValid}>
        <span>+</span>
      </SubmitButton>
    </AddBookForm>
  );
};

export default AddBook;
