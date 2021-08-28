import React, { Fragment, useContext } from "react";
import { Typography } from "@material-ui/core";
import { BookType } from "../../types/types";
import useBookDetails from "../../hooks/useBookDetails/useBookDetails";
import { objAuthContext } from "../../containers/AuthProvider";
import FavButton from "./components/FavButton";
import EditButton from "./components/EditButton";
import { useStyles } from "./style";

type Props = {
  strBookId: string;
  setBShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * @description selected book details
 * @param {String} strBookId book ID
 * @param {Function} setBShowEditModal operate edit modal
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({ strBookId, setBShowEditModal }) => {
  const classes = useStyles();
  const { getIsAdmin } = useContext(objAuthContext);
  const { data, loading, error, funcIsBookFavorite, funcToggleAsFavorite } =
    useBookDetails({ strBookId });

  if (loading) return <Typography>Loading book details...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!data?.book) return <Typography>No book selected.</Typography>;

  /**
   * @param {Object} objBook fetched book object
   * @returns {JSX} book details conditional render
   */
  const renderBook = (objBook?: BookType) => {
    if (objBook) {
      const { id, name, genre, author, addedBy } = objBook;
      return (
        <Fragment>
          <Typography variant="h4" component="h2">
            {name}
            <FavButton
              bFavorite={funcIsBookFavorite(id)}
              handleClick={funcToggleAsFavorite(id)}
            />
            {true === getIsAdmin() && (
              <EditButton handleClick={() => setBShowEditModal(true)} />
            )}
          </Typography>
          <Typography>{genre}</Typography>
          <Typography>{author!.name}</Typography>
          <Typography>All books by this author:</Typography>
          <ul>
            {author!.books!.map((objBook: Record<string, any>) => (
              <li key={objBook!.id}>{objBook!.name}</li>
            ))}
          </ul>
          {!!addedBy && (
            <Typography className={classes.bookDetails__addedBy}>
              Book added by: {addedBy}
            </Typography>
          )}
        </Fragment>
      );
    } else {
      return <Typography>No book selected.</Typography>;
    }
  };

  return <div>{renderBook(data.book)}</div>;
};

export default BookDetails;
