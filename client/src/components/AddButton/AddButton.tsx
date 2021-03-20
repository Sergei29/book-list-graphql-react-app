import React from "react";
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
    <button className={classes.addButton} onClick={handleClick} {...rest}>
      <span>+</span>
    </button>
  );
};

export default AddButton;
