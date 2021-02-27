import styled from "styled-components";

export const BookDetailsContainerStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: ${(props) => props.theme.palette.rasberry};
  padding: 30px;
  overflow: auto;
  box-shadow: -2px -3px 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  color: ${(props) => props.theme.font.light};
  z-index: 2;
`;
