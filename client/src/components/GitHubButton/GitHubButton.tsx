import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
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
      <GitHubIcon fontSize="small" />
      <span>view source code</span>
    </a>
  );
};

export default GitHubButton;
