import React from "react";
//styles:
import { AddButtonStyled } from "./AddButton.styled";
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
const AddButton: React.FC<Props> = ({ handleClick, ...rest }) => (
  <AddButtonStyled onClick={handleClick} {...rest}>
    <span>+</span>
  </AddButtonStyled>
);

export default AddButton;
