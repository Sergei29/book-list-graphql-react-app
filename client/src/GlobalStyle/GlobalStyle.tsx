import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #eee;
	font-family: "Nunito", Arial, sans-serif;
  }

  ul, ul li {
    padding: 0;
    margin: 0;
    text-indent: 0;
  }
`;

export default GlobalStyle;
