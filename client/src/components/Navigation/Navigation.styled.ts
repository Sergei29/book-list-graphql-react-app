import styled from "styled-components";

export const NavbarStyled = styled.nav`
  & > ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    & > li {
      display: inline-block;
      margin: 0 5px;
      & > a {
        color: #444;
        text-decoration: none;
        &.active {
          text-decoration: underline;
        }
      }
    }
  }
`;
