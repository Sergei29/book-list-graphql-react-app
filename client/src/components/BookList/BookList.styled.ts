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
  &:hover {
    color: ${(props) => props.theme.font.light};
    background-color: ${(props) => props.theme.palette.bordeau};
    transform: scale(1.1);
  }
  &:focus,
  &:active {
    color: ${(props) => props.theme.font.main};
    animation: shake 0.5s;
  }
  transition: all 200ms ease-in-out;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;
