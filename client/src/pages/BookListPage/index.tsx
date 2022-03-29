import React, { useContext, useState } from "react";
import { Typography } from "@material-ui/core";
import { objAuthContext } from "../../containers/AuthProvider";
import useBookListPage from "../../hooks/useBookListPage";
import { OBJ_TEST_IDS } from "../../constants";
//components:
import BookList from "../../components/BookList";
import BookDetails from "../../components/BookDetails";
import AddBook from "../../components/AddBook";
import Background from "../../components/Background";
import ChangeListLayoutButton from "../../components/ChangeListLayoutButton";
//styles:
import { useStyles } from "./style";

/**
 * @description books list page
 * @returns {JSX} component markup
 */
const BookListPage: React.FC = () => {
  const classes = useStyles();
  const [bDisplayCloud, setbDisplayCloud] = useState<boolean>(false);
  const { getIsAuthenticated } = useContext(objAuthContext);
  const { nStrSelectedBookId, handleBookSelect, handleBookDeselect } =
    useBookListPage();

  const funcToggleLayout = () => setbDisplayCloud((bPrevState) => !bPrevState);
  return (
    <div
      className={classes.bookListPage}
      data-testid={OBJ_TEST_IDS.bookListPage}
    >
      <Typography
        className={classes.bookListPage__heading}
        variant="h4"
        component="h1"
      >
        My Reading List
        <ChangeListLayoutButton
          onClick={funcToggleLayout}
          bDisplayCloud={bDisplayCloud}
        />
      </Typography>
      <BookList bDisplayCloud={bDisplayCloud} onBookSelect={handleBookSelect} />

      {getIsAuthenticated() && (
        <AddBook nStrSelectedBookId={nStrSelectedBookId} />
      )}
      <BookDetails
        nstrBookId={nStrSelectedBookId}
        handleBookDeselect={handleBookDeselect}
        handleBookSelect={handleBookSelect}
      />
      <Background />
    </div>
  );
};

export default BookListPage;
