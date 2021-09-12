import React from "react";
import BookForm from "../../../BookForm";
import useEditBookForm from "../../../../hooks/useEditBookForm/useEditBookForm";
import { BookType } from "../../../../types";

type Props = {
  objSelectedBook: BookType;
  onSumbit?: () => void;
};

/**
 * @description edit selected book form
 * @param {Object} objSelectedBook current selected book data
 * @param {Function | undefined} onSumbit on submit callback, optional
 * @returns {JSX} markup
 */
const EditBookForm: React.FC<Props> = ({ objSelectedBook, onSumbit }) => {
  const {
    bFormValid,
    handleBlur,
    handleChange,
    handleChangeImage,
    handleSubmit,
    uObjImageFile,
    objEditBookMutationResponse,
    objNewBook,
    objFormValidation,
  } = useEditBookForm(objSelectedBook, onSumbit);

  return (
    <BookForm
      bEditBook
      bFormValid={bFormValid}
      handleBlur={handleBlur}
      handleChangeImage={handleChangeImage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      objNewBook={objNewBook}
      objBookMutationResponse={objEditBookMutationResponse}
      objFormValidation={objFormValidation}
      uObjImageFile={uObjImageFile}
    />
  );
};

export default EditBookForm;
