import React from "react";
import { Typography } from "@material-ui/core";
import FavButton from "../FavButton";
import EditButton from "../EditButton";

type Props = {
  bFavorite: boolean;
  bIsAdmin: boolean;
  handleClickFavorite: () => void;
  handleOpenEditModal: () => void;
  strAuthorName: string;
  strBookGenre: string;
  strBookTitle: string;
  strCustomClass?: string;
};

const BookDetailsHeader: React.FC<Props> = ({
  bFavorite,
  bIsAdmin,
  handleClickFavorite,
  handleOpenEditModal,
  strAuthorName,
  strBookGenre,
  strBookTitle,
  strCustomClass = "",
}) => {
  return (
    <div className={strCustomClass}>
      <Typography variant="h4" component="h2">
        {strBookTitle}
        <FavButton bFavorite={bFavorite} handleClick={handleClickFavorite} />
        {true === bIsAdmin && <EditButton handleClick={handleOpenEditModal} />}
      </Typography>
      <Typography>{strBookGenre}</Typography>
      <Typography>{strAuthorName}</Typography>
    </div>
  );
};

export default BookDetailsHeader;
