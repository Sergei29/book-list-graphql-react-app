import styled from "styled-components";

export const AddButtonStyled = styled.button`
  color: #fff;
  font-size: 2em;
  background: #ad1457;
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
  &:active,
  &:focus {
    outline: none;
  }
`;
