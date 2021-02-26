import React from "react";
import { Github } from "@styled-icons/fa-brands";
//styles:
import { ButtonStyled } from "./GitHubButton.styled";

const GitHubButton: React.FC = () => {
  return (
    <ButtonStyled
      href="https://github.com/Sergei29/book-list-graphql-react-app"
      target="_blank"
      className="gitHubButton"
    >
      <Github size="16" />
      <span>view source code</span>
    </ButtonStyled>
  );
};

export default GitHubButton;
