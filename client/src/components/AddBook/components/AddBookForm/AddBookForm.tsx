import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "../../../common/TextField";
import SubmitButton from "../../../common/SubmitButton";
import useAddBookForm from "../../../../hooks/useAddBookForm";
import { AuthorType } from "../../../../types/types";
// styles:
import { useStyles } from "./style";

type Props = {
  nstrSelectedBookId: string | null;
  onSumbit: () => void;
};

const AddBookForm: React.FC<Props> = ({ nstrSelectedBookId, onSumbit }) => {
  const classes = useStyles();

  const {
    bFormValid,
    handleBlur,
    handleChange,
    handleSubmit,
    objAddBookMutationResponse,
    objAuthorsQueryResponse,
    objBook,
    objFormValidation,
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

  return (
    <form onSubmit={handleSubmit} className={classes.addBookForm}>
      {objMutationError && (
        <span className={classes.addBookForm__errorMessage}>
          {objMutationError.message}
        </span>
      )}

      <FormControl>
        <TextField
          label="Name"
          strFieldname="name"
          strValue={objBook.name}
          handleChange={handleChange}
          handleBlur={handleBlur}
          objValidation={objFormValidation.name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MenuBookIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Genre"
          strFieldname="genre"
          strValue={objBook.genre}
          handleChange={handleChange}
          handleBlur={handleBlur}
          objValidation={objFormValidation.genre}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CollectionsBookmarkIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <TextField
          select
          label="Author"
          strFieldname="authorId"
          strValue={objBook.authorId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          objValidation={objFormValidation.authorId}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountBoxIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        >
          {displayAuthors()}
        </TextField>
      </FormControl>

      <div>
        <SubmitButton type="submit" disabled={!bFormValid || bMutationLoading}>
          Add Book
        </SubmitButton>
      </div>
    </form>
  );
};

export default AddBookForm;
