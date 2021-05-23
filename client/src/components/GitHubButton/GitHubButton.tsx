import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
//styles:
import { useStyles } from "./style";

type Props = {
  bLightTheme: boolean;
};

const GitHubButton: React.FC<Props> = ({ bLightTheme }) => {
  const classes = useStyles({ bLightTheme });
  const theme = useTheme();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));
  if (true === bIsMobileScreen) {
    return (
      <ListItem
        component="a"
        href="https://github.com/Sergei29/book-list-graphql-react-app"
        target="_blank"
      >
        <ListItemIcon>
          <GitHubIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Source code</ListItemText>
      </ListItem>
    );
  }

  return (
    <a
      href="https://github.com/Sergei29/book-list-graphql-react-app"
      target="_blank"
      className={classes.linkToGithub}
    >
      <GitHubIcon fontSize="small" />
      <span>Source code</span>
    </a>
  );
};

export default GitHubButton;
