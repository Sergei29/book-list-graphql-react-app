import styled from "styled-components";

export const AdminContainer = styled.div`
  text-align: center;
  color: #444;
`;

export const AuthorContainer = styled.div``;
export const Author = styled.div`
  display: flex;
  justify-content: center;
  & > h4 {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  & > svg {
    margin: 16px;
    &:hover,
    &:focus {
      color: #ad1457;
    }
  }
`;

export const AuthorBooks = styled.div`
  & > ul > li {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
    & > svg {
      margin: 0 16px;
      &:hover,
      &:focus {
        color: #ad1457;
      }
    }
  }
`;
