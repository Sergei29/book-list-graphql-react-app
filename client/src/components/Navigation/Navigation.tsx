import React, { Fragment } from "react";
import { useTheme, useMediaQuery, Typography } from "@material-ui/core";
import useCurrentUser from "../../hooks/useCurrentUser/useCurrentUser";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
import useModal from "../../hooks/useModal/useModal";
// components:
import AuthModal from "../AuthModal";
import AuthForm from "../AuthForm";
import MobileNavigation from "./components/MobileNavigation";
import DesktopNavigation from "./components/DesktopNavigation";
// styles:
import { useStyles } from "./style";

type Props = {};

/**
 * @description navigation component
 * @returns {JSX} component markup
 */
const Navigation: React.FC<Props> = () => {
  const classes = useStyles();
  const { bLoggedIn, handleLogout } = useCurrentUser();
  const { bLightTheme, funcToggleTheme } = useCurrentTheme();
  const theme = useTheme();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { bOpenModal, funcModalClose, funcModalOpen } = useModal();

  return (
    <Fragment>
      {true === bIsMobileScreen ? (
        <MobileNavigation
          bLoggedIn={bLoggedIn}
          bLightTheme={bLightTheme}
          funcToggleTheme={funcToggleTheme}
          funcModalOpen={funcModalOpen}
          handleLogout={handleLogout}
        />
      ) : (
        <DesktopNavigation
          bLoggedIn={bLoggedIn}
          bLightTheme={bLightTheme}
          funcModalOpen={funcModalOpen}
          funcToggleTheme={funcToggleTheme}
          handleLogout={handleLogout}
        />
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
    </Fragment>
  );
};

export default Navigation;
