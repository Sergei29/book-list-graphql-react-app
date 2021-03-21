import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//styles:
import { useStyles } from "./style";

type ButtonAttributes = Record<string, any>;

type Props = {
  handleClick?: () => void;
} & ButtonAttributes;

/**
 * @description add button component
 * @param {Function} {handleClick callback on click
 * @param {unknown} rest possible rest params}
 * @returns {JSX} component markup
 */
const AddButton: React.FC<Props> = ({ handleClick, ...rest }) => {
  const classes = useStyles();
  return (
    <Fab
      className={classes.addButton}
      onClick={handleClick}
      {...rest}
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
