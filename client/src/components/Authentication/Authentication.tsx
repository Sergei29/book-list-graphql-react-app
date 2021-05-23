import React, { useState, useCallback } from "react";
import {
  IconButton,
  Typography,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
//components:
import AuthModal from "../AuthModal";
import AuthForm from "../AuthForm";
// styles:
import { useStyles } from "./style";

type Props = {
  bLoggedIn: boolean;
  handleLogout: () => void;
};

/**
 * @description functional component, authentication link and modal
 * @returns {JSX} authentication markup
 */
const Authentication: React.FC<Props> = ({ bLoggedIn, handleLogout }) => {
  const classes = useStyles();
  const [bOpenModal, setbOpenModal] = useState<boolean>(false);
  const theme = useTheme();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));

  /**
   * @description operate modal to open
   * @returns {undefined} sets state
   */
  const funcnModalOpen = useCallback(() => setbOpenModal(true), []);

  /**
   * @description operate modal to close
   * @returns {undefined} sets state
   */
  const funcModalClose = useCallback(() => setbOpenModal(false), []);

  if (true === bIsMobileScreen) {
    return (
      <ListItem button onClick={bLoggedIn ? handleLogout : funcnModalOpen}>
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
    <div>
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
          onClick={funcnModalOpen}
          className={classes.authButton}
          disableFocusRipple
        >
          <Tooltip title="login">
            <LockIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      )}
      <AuthModal bOpen={bOpenModal} handleClose={funcModalClose}>
        <Typography variant="h5" component="h3" className={classes.authHeading}>
          Authentication
        </Typography>
        <Typography className={classes.authHelperText}>
          username: serge | password: secret123
        </Typography>
        <AuthForm funcCloseModal={funcModalClose} />
      </AuthModal>
    </div>
  );
};

export default Authentication;
