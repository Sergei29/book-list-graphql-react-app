import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import useBookDetails from "../../hooks/useBookDetails/useBookDetails";
import { objAuthContext } from "../../containers/AuthProvider";
import BookDetailsHeader from "./components/BookDetailsHeader";
import BookDetailsMain from "./components/BookDetailsMain";
import { useStyles } from "./style";

type Props = {
  strBookId: string;
  setBShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleBookSelect: (strBookId: string) => () => void;
};

/**
 * @description selected book details
 * @param {String} strBookId book ID
 * @param {Function} setBShowEditModal operate edit modal
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({
  strBookId,
  setBShowEditModal,
  handleBookSelect,
}) => {
  const classes = useStyles();
  const { getIsAdmin } = useContext(objAuthContext);
  const { data, loading, error, funcIsBookFavorite, funcToggleAsFavorite } =
    useBookDetails({ strBookId });

  if (loading) return <Typography>Loading book details...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!data?.book) return <Typography>No book selected.</Typography>;
  const { id, genre, name, author, addedBy, description, image } = data?.book;
  return (
    <div>
      <BookDetailsHeader
        bFavorite={funcIsBookFavorite(id)}
        bIsAdmin={getIsAdmin()}
        handleClickFavorite={funcToggleAsFavorite(id)}
        handleOpenEditModal={() => setBShowEditModal(true)}
        strAuthorName={author?.name!}
        strBookGenre={genre!}
        strBookTitle={name!}
        strCustomClass={classes.bookDetails__header}
      />
      <BookDetailsMain
        strImageUrl={image?.imageUrl}
        strDescription={description || "book brief description"}
      />
      <div className={classes.bookDetails__otherBooksList}>
        <Typography variant="h4" component="h5">
          All books by this author:
        </Typography>
        <div>
          {author!.books!.map((objBook: Record<string, any>) => (
            <Chip
              key={objBook!.id}
              label={objBook!.name}
              onClick={handleBookSelect(objBook!.id)}
              disabled={objBook!.id === strBookId}
            />
          ))}
        </div>
        {!!addedBy && (
          <Typography className={classes.bookDetails__addedBy}>
            Book added by: {addedBy}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
