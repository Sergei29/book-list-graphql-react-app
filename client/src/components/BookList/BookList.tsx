import React from "react";
import { useGetBooksQuery } from "../../generated/graphql";
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
  const { data, loading, error } = useGetBooksQuery();

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.books?.length === 0) return <p>No books.</p>;

  return (
    <ul>
      {data?.books?.map((objBook) => (
        <ListItemStyled key={objBook!.id} onClick={onBookSelect!(objBook!.id)}>
          {objBook!.name}
        </ListItemStyled>
      ))}
    </ul>
  );
};

export default BookList;
