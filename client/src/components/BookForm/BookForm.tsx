import React from "react";
import { MutationResult, useQuery } from "@apollo/client";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import MenuItem from "@material-ui/core/MenuItem";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { GET_AUTHORS } from "../../graphql/queries";
import TextField from "../common/TextField";
import FileInput from "../common/FileInput";
import SubmitButton from "../common/SubmitButton";
import {
  ValidationType,
  NewBookFormStateType,
  AuthorType,
} from "../../types/types";
// styles:
import { useStyles } from "./style";

type Props = {
  bEditBook?: boolean;
  bFormValid: boolean;
  handleBlur: (strFieldName: string, strFieldValue: string) => void;
  handleChange: (
    strFieldName: string,
    mixedValue: string | Record<string, any>
  ) => void;
  handleChangeImage: (
    strFieldName: string,
    objImageFile?: File | undefined
  ) => void;
  handleSubmit: (objEvent: React.FormEvent) => void;
  objNewBook: NewBookFormStateType;
  objBookMutationResponse: MutationResult<any>;
  objFormValidation: Readonly<
    Record<"name" | "genre" | "authorId" | "strBase64ImageFile", ValidationType>
  >;
  uObjImageFile: File | undefined;
};

const BookForm: React.FC<Props> = ({
  bEditBook = false,
  bFormValid,
  handleBlur,
  handleChangeImage,
  handleChange,
  handleSubmit,
  objNewBook,
  objBookMutationResponse,
  objFormValidation,
  uObjImageFile,
}) => {
  const classes = useStyles();

  const { error: objMutationError, loading: bMutationLoading } =
    objBookMutationResponse;

  const objAuthorsQueryResponse =
    useQuery<{ authors: AuthorType[] }>(GET_AUTHORS);

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

  if (bMutationLoading) {
    return (
      <div className={classes.bookForm}>
        <Typography className={classes.bookForm__loader}>
          {bEditBook ? "Updating..." : "Creating..."}
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={classes.bookForm}>
      {objMutationError && (
        <span className={classes.bookForm__errorMessage}>
          {objMutationError.message}
        </span>
      )}
      <div className={classes.bookForm__inputFields}>
        <div>
          <TextField
            label="Name"
            strFieldname="name"
            strValue={objNewBook.name}
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
          <TextField
            label="Genre"
            strFieldname="genre"
            strValue={objNewBook.genre}
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
          <TextField
            select
            label="Author"
            strFieldname="authorId"
            strValue={objNewBook.authorId}
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
        </div>
        <div>
          <FileInput
            strFieldName="strBase64ImageFile"
            objValidation={objFormValidation.strBase64ImageFile}
            objFileValue={uObjImageFile}
            handleChange={handleChangeImage}
            strCustomClass={classes.bookForm__fileInput}
          />
          {objNewBook.strBase64ImageFile && (
            <CardMedia component="img" src={objNewBook.strBase64ImageFile} />
          )}
        </div>
      </div>

      <div className={classes.bookForm__buttons}>
        <SubmitButton type="submit" disabled={!bFormValid || bMutationLoading}>
          {bEditBook ? "Update Book" : "Add Book"}
        </SubmitButton>
      </div>
    </form>
  );
};

export default BookForm;
