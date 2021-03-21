import React from "react";
import { Typography } from "@material-ui/core";
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

  if (loading) return <Typography>Loading book details...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!data?.book) return <Typography>No book selected.</Typography>;

  /**
   * @param {Object} data query response data object
   * @returns {JSX} book details conditional render
   */
  const renderBook = (data: GetBookDetailsQuery) => {
    if (data!.book) {
      const { name, genre, author } = data!.book;
      return (
        <div>
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <Typography>{genre}</Typography>
          <Typography>{author!.name}</Typography>
          <Typography>All books by this author:</Typography>
          <ul>
            {author!.books!.map((objBook) => (
              <li key={objBook!.id}>{objBook!.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <Typography>No book selected.</Typography>;
    }
  };

  return <div>{renderBook(data)}</div>;
};

export default BookDetails;
