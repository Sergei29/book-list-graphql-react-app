import React from "react";
import { Github } from "@styled-icons/fa-brands";
//styles:
import { useStyles } from "./style";

const GitHubButton: React.FC = () => {
  const classes = useStyles();
  return (
    <a
      href="https://github.com/Sergei29/book-list-graphql-react-app"
      target="_blank"
      className={classes.linkToGithub}
    >
      <Github size="16" />
      <span>view source code</span>
    </a>
  );
};

export default GitHubButton;
