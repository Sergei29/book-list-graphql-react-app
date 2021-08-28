import React from "react";
import BookForm from "../BookForm";
import useBookDetails from "../../hooks/useBookDetails/useBookDetails";

type Props = {
  nStrSelectedBookId: string | null;
  onSumbit?: () => void;
};

const EditBookForm: React.FC<Props> = ({ nStrSelectedBookId, onSumbit }) => {
  return <div></div>;
};

export default EditBookForm;
