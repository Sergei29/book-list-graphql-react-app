import styled from "styled-components";

export const ListItemStyled = styled.li`
  display: inline-block;
  margin: 12px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.palette.bordeau};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  color: ${(props) => props.theme.font.bordeau};
`;
