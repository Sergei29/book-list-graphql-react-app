import styled from "styled-components";

export const ButtonStyled = styled.a`
  text-decoration: none;
  padding: 4px 8px;
  color: ${(props) => props.theme.font.light};
  display: flex;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.darkGrey};
  & > svg {
    margin-right: 4px;
  }
  &:hover {
    background-color: ${(props) => props.theme.palette.bordeau};
  }
  transition: all 200ms ease-in-out;
`;
