import React from "react";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

type Props = {
  bFavorite?: boolean;
  handleClick: () => void;
};

const FavButton: React.FC<Props> = ({ bFavorite = false, handleClick }) => {
  return (
    <IconButton onClick={handleClick}>
      {bFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default FavButton;
