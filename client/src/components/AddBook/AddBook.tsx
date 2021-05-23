import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import {
  IconButton,
  FormControl,
  MenuItem,
  Input,
  FormLabel,
  Button,
  TextField,
} from "@material-ui/core";
import { AuthorType } from "../../types/types";
import useAddBookForm from "../../hooks/useAddBookForm";
import useAddBook from "../../hooks/useAddBook/useAddBook";
import AddButton from "../AddButton";
// styles:
import { useStyles } from "./style";

type Props = {
  nstrSelectedBookId: null | string;
};

/**
 * @description add new book form
 * @returns {JSX} component markup
 */
const AddBook: React.FC<Props> = ({ nstrSelectedBookId }) => {
  const classes = useStyles();

  const { bDisplayForm, handleDismissForm, handleShowForm } = useAddBook();

  const {
    objFormValidaton,
    objAddBookMutationResponse,
    objAuthorsQueryResponse,
    objBook,
    handleSubmit,
    handleChange,
  } = useAddBookForm(nstrSelectedBookId);

  const { error: objMutationError, loading: bMutationLoading } =
    objAddBookMutationResponse;

  /**
   * @description display authors select options
   * @returns {JSX} markup
   */
  const displayAuthors = () => {
    const { data, loading, error } = objAuthorsQueryResponse;

    if (loading) return <MenuItem>loading authors...</MenuItem>;
    if (error) return <MenuItem>no authors.</MenuItem>;
    if (!data) return <MenuItem>no authors.</MenuItem>;

    if (data!.authors) {
      return data!.authors.map((objAuthor: AuthorType | null) => (
        <MenuItem value={objAuthor!.id} key={objAuthor!.id}>
          {objAuthor!.name!}
        </MenuItem>
      ));
    }
  };

  if (false === bDisplayForm) {
    return <AddButton handleClick={handleShowForm} title="Add New Book" />;
  }

  return (
    <form onSubmit={handleSubmit} className={classes.addBookForm}>
      {objFormValidaton.nstrErrorMessage && (
        <span className={classes.addBookForm__errorMessage}>
          {objFormValidaton.nstrErrorMessage}
        </span>
      )}
      {objMutationError && (
        <span className={classes.addBookForm__errorMessage}>
          {objMutationError.message}
        </span>
      )}
      <IconButton
        title="close the form"
        onClick={handleDismissForm}
        className={classes.addBookForm__closeButton}
        aria-label="close"
      >
        <HighlightOffIcon fontSize="large" />
      </IconButton>
      <FormControl className={classes.addBookForm__formControl}>
        <FormLabel
          className={classes.addBookForm__formControl__label}
          classes={{ focused: classes.formLabelFocused }}
        >
          Book name:
        </FormLabel>
        <Input
          type="text"
          name="name"
          value={objBook.name}
          onChange={handleChange}
          className={classes.addBookForm__formControl__inputText}
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <MenuBookIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl className={classes.addBookForm__formControl}>
        <FormLabel
          className={classes.addBookForm__formControl__label}
          classes={{ focused: classes.formLabelFocused }}
        >
          Genre:
        </FormLabel>
        <Input
          type="text"
          name="genre"
          value={objBook.genre}
          onChange={handleChange}
          className={classes.addBookForm__formControl__inputText}
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <CollectionsBookmarkIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl
        className={classes.addBookForm__formControl}
        variant="outlined"
      >
        <FormLabel
          className={classes.addBookForm__formControl__label}
          classes={{ focused: classes.formLabelFocused }}
        >
          Author:
        </FormLabel>
        <TextField
          select
          name="authorId"
          onChange={handleChange}
          value={objBook.authorId}
          className={classes.addBookForm__formControl__inputSelect}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountBoxIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        >
          {displayAuthors()}
        </TextField>
      </FormControl>

      <Button
        className={classes.addBookForm__submitButton}
        type="submit"
        disabled={!objFormValidaton.bIsValid || bMutationLoading}
      >
        Add Book
      </Button>
    </form>
  );
};

export default AddBook;
