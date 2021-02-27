import styled from "styled-components";

export const NavbarStyled = styled.nav`
  position: relative;
  z-index: 2;
  & > ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    & > li {
      display: inline-block;
      margin: 0 5px;
      & > a {
        color: ${(props) => props.theme.font.main};
        text-decoration: none;
        &.active {
          text-decoration: underline;
        }
      }
    }
  }
`;
