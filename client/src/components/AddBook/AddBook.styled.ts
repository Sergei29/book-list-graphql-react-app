import styled from "styled-components";
import { darken } from "polished";

export const AddBookForm = styled.form`
  background-color: ${(props) => props.theme.palette.transparentDark};
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;
  z-index: 2;

  & > svg {
    position: absolute;
    top: -6px;
    right: -12px;
    cursor: pointer;
    color: ${(props) => props.theme.palette.bordeau};
    &:hover {
      color: ${(props) => darken(1.1, props.theme.palette.bordeau)};
    }
  }
`;

export const FormControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const InputLabel = styled.label`
  text-align: right;
  padding: 6px;
  color: ${(props) => props.theme.font.yellow};
`;

export const TextInput = styled.input`
  margin: 4px;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.yellow};
  border: 1px solid ${(props) => props.theme.palette.bordeau};
  color: ${(props) => props.theme.palette.bordeau};
  &:active,
  &:focus,
  &::selection,
  &:-webkit-autofill {
    background-color: ${(props) => props.theme.palette.yellow} !important;
    border: 1px solid ${(props) => props.theme.palette.bordeau};
    color: ${(props) => props.theme.palette.bordeau};
    outline: none;
  }
`;

export const SelectInput = styled.select`
  margin: 4px;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.yellow};
  border: 1px solid ${(props) => props.theme.palette.bordeau};
  color: ${(props) => props.theme.palette.bordeau};
  &:active,
  &:focus,
  &::selection {
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.font.bordeau};
`;

export const SubmitButton = styled.button`
  color: ${(props) => props.theme.font.bordeau};
  font-size: 1em;
  background: ${(props) => props.theme.palette.yellow};
  border: 1px solid ${(props) => props.theme.palette.bordeau};
  padding: 8px 16px;
  border-radius: 4px;
  position: absolute;
  bottom: 25px;
  left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
  &:focus,
  &:active {
    color: ${(props) => props.theme.font.main};
    transform: scale(1.01);
  }
  transition: all 200ms ease-in-out;
`;
