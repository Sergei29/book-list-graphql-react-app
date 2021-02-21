import React from "react";
import {
  useGetBookDetailsQuery,
  GetBookDetailsQuery,
} from "../../generated/graphql";

type Props = {
  strBookId: string;
};

/**
 * @description selected book details
 * @param {String} {strBookId book ID}
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({ strBookId }) => {
  const { data, loading, error } = useGetBookDetailsQuery({
    variables: { id: strBookId },
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.book) return <p>No book selected.</p>;

  /**
   * @param {Object} data query response data object
   * @returns {JSX} book details conditional render
   */
  const renderBook = (data: GetBookDetailsQuery) => {
    if (data!.book) {
      const { name, genre, author } = data!.book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author!.name}</p>
          <p>All books by this author:</p>
          <ul>
            {author!.books!.map((objBook) => (
              <li key={objBook!.id}>{objBook!.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No book selected.</p>;
    }
  };

  return <div>{renderBook(data)}</div>;
};

export default BookDetails;
