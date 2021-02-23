import styled from "styled-components";

export const AdminContainer = styled.div`
  color: ${(props) => props.theme.font.main};
`;

export const AuthorsContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const Author = styled.div`
  display: flex;
  & > h4 {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  & > svg {
    margin: 16px;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.palette.rasberry};
    }
  }
`;

export const AuthorBooks = styled.div`
  & > ul > li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 4px 6px;
    border-radius: 4px;
    &:hover {
      background-color: ${(props) => props.theme.palette.darkGrey};
      color: ${(props) => props.theme.font.light};
    }
    & > svg {
      margin: 0 16px;
      &:hover,
      &:focus {
        color: ${(props) => props.theme.palette.rasberry};
      }
    }
  }
`;
