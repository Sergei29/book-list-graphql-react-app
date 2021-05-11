import React from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { GET_BOOK_DETAILS } from "../../graphql/queries";
import { favoriteVar } from "../../ApolloProvider/ApolloProvider";
import { BookType } from "../../types/types";
import FavButton from "./components/FavButton";

type Props = {
  strBookId: string;
};

/**
 * @description selected book details
 * @param {String} {strBookId book ID}
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({ strBookId }) => {
  const { data, loading, error } = useQuery<{ book: BookType }>(
    GET_BOOK_DETAILS,
    {
      variables: { id: strBookId },
    }
  );

  if (loading) return <Typography>Loading book details...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!data?.book) return <Typography>No book selected.</Typography>;

  const handleSetFavorite = (
    strBookId: string,
    bIsBookFavorite: boolean = false
  ) => () => {
    const { arrChecked } = favoriteVar();
    if (bIsBookFavorite) {
      const arrNewFavorites = arrChecked.filter((strId) => strId !== strBookId);
      favoriteVar({ arrChecked: arrNewFavorites });
    } else {
      favoriteVar({
        arrChecked: [...arrChecked, strBookId],
      });
    }
  };

  /**
   * @param {Object} objBook fetched book object
   * @returns {JSX} book details conditional render
   */
  const renderBook = (objBook?: BookType) => {
    if (objBook) {
      const { id, name, genre, author, bFavorite } = objBook;
      return (
        <div>
          <Typography variant="h4" component="h2">
            {name}{" "}
            <FavButton
              bFavorite={bFavorite}
              handleClick={handleSetFavorite(id, bFavorite)}
            />
          </Typography>
          <Typography>{genre}</Typography>
          <Typography>{author!.name}</Typography>
          <Typography>All books by this author:</Typography>
          <ul>
            {author!.books!.map((objBook: Record<string, any>) => (
              <li key={objBook!.id}>{objBook!.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <Typography>No book selected.</Typography>;
    }
  };

  return <div>{renderBook(data.book)}</div>;
};

export default BookDetails;
