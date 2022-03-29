import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Link,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { OBJ_TEST_IDS } from "../../constants";
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
        classes={{ root: classes.linkToGithub__text }}
      >
        <ListItemIcon classes={{ root: classes.linkToGithub__text }}>
          <GitHubIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Source code</ListItemText>
      </ListItem>
    );
  }

  return (
    <Link
      href="https://github.com/Sergei29/book-list-graphql-react-app"
      target="_blank"
      className={classes.linkToGithub}
      data-testid={OBJ_TEST_IDS.gitHubLink}
    >
      <GitHubIcon fontSize="small" />
      <span>Source code</span>
    </Link>
  );
};

export default GitHubButton;
