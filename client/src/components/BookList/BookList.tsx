import React from "react";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
import { BookType } from "../../types/types";
//styles:
import { useStyles } from "./style";

type Props = {
  bDisplayCloud: boolean;
  onBookSelect: (strId: string) => () => void;
};

/**
 * @description book list component
 * @param {Function} {onBookSelect callback function on selecting a single book}
 * @returns {JSX} coponent markup
 */
const BookList: React.FC<Props> = ({ bDisplayCloud, onBookSelect }) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery<{ books: BookType[] }>(GET_BOOKS);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.books?.length === 0) return <p>No books.</p>;

  const renderTagCloud = () => (
    <TagCloud
      style={
        {
          fontFamily: "sans-serif",
          fontSize: 30,
          fontWeight: "bold",
          fontStyle: "italic",
          color: () => randomColor(),
          padding: 5,
          width: "100%",
          height: "80vh",
        } as any
      }
    >
      {data!.books.map((objBook) => (
        <div key={objBook!.id} onClick={onBookSelect!(objBook!.id)}>
          {objBook!.name}
        </div>
      ))}
    </TagCloud>
  );

  return bDisplayCloud ? (
    renderTagCloud()
  ) : (
    <ul className={classes.bookList}>
      {data!.books.map((objBook) => (
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
