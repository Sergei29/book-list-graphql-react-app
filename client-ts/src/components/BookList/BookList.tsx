import React from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../queries/queries";
import { BookType } from "../../types/types";
//styles:
import { ListItemStyled } from "./BookList.styled";

type Props = {
  onBookSelect: (strId: string) => () => void;
};

/**
 * @description book list component
 * @param {Function} {onBookSelect callback function on selecting a single book}
 * @returns {JSX} coponent markup
 */
const BookList: React.FC<Props> = ({ onBookSelect }) => {
  const { data, loading, error } = useQuery(getBooksQuery);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.books.length === 0) return <p>No books.</p>;

  return (
    <ul>
      {data.books.map((objBook: BookType) => (
        <ListItemStyled key={objBook.id} onClick={onBookSelect!(objBook.id)}>
          {objBook.name}
        </ListItemStyled>
      ))}
    </ul>
  );
};

export default BookList;
