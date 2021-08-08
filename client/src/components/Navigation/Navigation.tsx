import React, { Fragment, useContext } from "react";
import { useTheme, useMediaQuery, Typography } from "@material-ui/core";
import { useAuthentication } from "../../hooks/useAuthentication";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
import useModal from "../../hooks/useModal/useModal";
import { objAuthContext } from "../../containers/AuthProvider";
// components:
import AuthModal from "../AuthModal";
import SignInForm from "../SignInForm";
import MobileNavigation from "./components/MobileNavigation";
import DesktopNavigation from "./components/DesktopNavigation";
// styles:
import { useStyles } from "./style";

/**
 * @description navigation component
 * @returns {JSX} component markup
 */
const Navigation: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { getIsAdmin, getIsAuthenticated } = useContext(objAuthContext);
  const { handleSignOut } = useAuthentication();
  const { bLightTheme, funcToggleTheme } = useCurrentTheme();
  const { bOpenModal, funcModalClose, funcModalOpen } = useModal();

  return (
    <Fragment>
      {true === bIsMobileScreen ? (
        <MobileNavigation
          bAdmin={getIsAdmin()}
          bLoggedIn={getIsAuthenticated()}
          bLightTheme={bLightTheme}
          funcToggleTheme={funcToggleTheme}
          funcModalOpen={funcModalOpen}
          handleLogout={handleSignOut}
        />
      ) : (
        <DesktopNavigation
          bAdmin={getIsAdmin()}
          bLoggedIn={getIsAuthenticated()}
          bLightTheme={bLightTheme}
          funcModalOpen={funcModalOpen}
          funcToggleTheme={funcToggleTheme}
          handleLogout={handleSignOut}
        />
      )}
      <AuthModal bOpen={bOpenModal} handleClose={funcModalClose}>
        <Typography variant="h5" component="h3" className={classes.authHeading}>
          Authentication
        </Typography>
        <Typography className={classes.authHelperText}>
          email: user123@gmail.com | password: secret123
        </Typography>
        <SignInForm funcCloseModal={funcModalClose} />
      </AuthModal>
    </Fragment>
  );
};

export default Navigation;
