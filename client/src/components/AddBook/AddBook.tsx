import React from "react";
import { AuthorType } from "../../types/types";
import { useForm } from "./hooks/useForm";
import { TimesCircle } from "@styled-icons/fa-regular";
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

type Props = {
  funcHideForm: () => void;
  nstrSelectedBookId: null | string;
};
/**
 * @description add new book form
 * @returns {JSX} component markup
 */
const AddBook: React.FC<Props> = ({ funcHideForm, nstrSelectedBookId }) => {
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
    <AddBookForm id="add-book" onSubmit={handleSubmit}>
      {objFormValidaton.nstrErrorMessage && (
        <ErrorMessage>{objFormValidaton.nstrErrorMessage}</ErrorMessage>
      )}
      {objMutationError && (
        <ErrorMessage>{objMutationError.message}</ErrorMessage>
      )}
      <TimesCircle
        onClick={funcHideForm}
        size="25"
        title="close the form"
        color="#444"
      />
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

      <SubmitButton
        type="submit"
        disabled={!objFormValidaton.bIsValid || bMutationLoading}
      >
        Add Book
      </SubmitButton>
    </AddBookForm>
  );
};

export default AddBook;
