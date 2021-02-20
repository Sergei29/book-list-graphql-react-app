import React from "react";
//styles:
import { AddButtonStyled } from "./AddButton.styled";
type ButtonAttributes = Record<string, any>;

type Props = {
  handleClick?: () => void;
} & ButtonAttributes;

const AddButton: React.FC<Props> = ({ handleClick, ...rest }) => (
  <AddButtonStyled onClick={handleClick} {...rest}>
    <span>+</span>
  </AddButtonStyled>
);

export default AddButton;
