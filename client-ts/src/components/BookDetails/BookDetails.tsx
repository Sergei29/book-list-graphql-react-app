import React from "react";
import { useQuery } from "@apollo/client";
import { getBookDetailsQuery } from "../../queries/queries";
import { BookType } from "../../types/types";

type Props = {
  strBookId: string;
};

/**
 * @description selected book details
 * @param {String} {strBookId book ID}
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({ strBookId }) => {
  const { data, loading, error } = useQuery(getBookDetailsQuery, {
    variables: { id: strBookId },
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data.book) return <p>No book selected.</p>;

  /**
   * @param {Object} data query response data object
   * @returns {JSX} book details conditional render
   */
  const renderBook = (data: Record<"book", BookType>) => {
    if (data.book) {
      const { name, genre, author } = data.book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All books by this author:</p>
          <ul>
            {author.books.map((objBook: BookType) => (
              <li key={objBook.id}>{objBook.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No book selected.</p>;
    }
  };

  return <div>{!!data && renderBook(data)}</div>;
};

export default BookDetails;
