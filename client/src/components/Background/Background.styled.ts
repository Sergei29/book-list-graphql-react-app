import styled from "styled-components";

export const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-image: url(${`${process.env.PUBLIC_URL}/images/lincoln-freitas-qgpCWCjaC9w-unsplash.jpg`});
  background-size: cover;
  opacity: 0.3;
  width: 60vw;
`;
