import React from "react";
import {
  IconButton,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
// styles:
import { useStyles } from "./style";

type Props = {
  bLoggedIn: boolean;
  funcModalOpen: () => void;
  handleLogout: () => void;
};

/**
 * @description functional component, authentication link and modal
 * @returns {JSX} authentication markup
 */
const AuthLink: React.FC<Props> = ({
  bLoggedIn,
  handleLogout,
  funcModalOpen,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));

  if (true === bIsMobileScreen) {
    return (
      <ListItem button onClick={bLoggedIn ? handleLogout : funcModalOpen}>
        <ListItemIcon className={classes.authButtonMobile__icon}>
          {bLoggedIn ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon>
        <ListItemText className={classes.authButtonMobile__text}>
          {bLoggedIn ? "Logout" : "Login"}
        </ListItemText>
      </ListItem>
    );
  }

  return (
    <div data-testid="auth-link">
      {bLoggedIn ? (
        <IconButton
          onClick={handleLogout}
          className={classes.authButton}
          disableFocusRipple
        >
          <Tooltip title="logout">
            <LockOpenIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      ) : (
        <IconButton
          onClick={funcModalOpen}
          className={classes.authButton}
          disableFocusRipple
        >
          <Tooltip title="login / sign up">
            <LockIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      )}
    </div>
  );
};

export default AuthLink;
