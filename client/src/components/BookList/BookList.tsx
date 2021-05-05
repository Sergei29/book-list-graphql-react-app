import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
//styles:
import { useStyles } from "./style";

type Props = {
  onBookSelect: (strId: string) => () => void;
};

/**
 * @description book list component
 * @param {Function} {onBookSelect callback function on selecting a single book}
 * @returns {JSX} coponent markup
 */
const BookList: React.FC<Props> = ({ onBookSelect }) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.books?.length === 0) return <p>No books.</p>;

  return (
    <ul className={classes.bookList}>
      {data?.books?.map((objBook: Record<string, any>) => (
        <li
          key={objBook!.id}
          onClick={onBookSelect!(objBook!.id)}
          className={classes.bookList__item}
        >
          {objBook!.name}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
