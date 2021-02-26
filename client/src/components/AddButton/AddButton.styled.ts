import styled from "styled-components";

export const AddButtonStyled = styled.button`
  color: ${(props) => props.theme.palette.white};
  font-size: 2em;
  background: ${(props) => props.theme.palette.rasberry};
  border: 0;
  padding: 16px;
  width: 50px;
  height: 49px;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
  &:hover {
    background: ${(props) => props.theme.palette.bordeau};
  }
  &:active,
  &:focus {
    outline: none;
    transform: scale(1.01);
  }
  transition: all 200ms ease-in-out;
`;
