import React, { Fragment, useContext, useState } from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { useAuthentication } from "../../hooks/useAuthentication";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
import useModal from "../../hooks/useModal/useModal";
import { objAuthContext } from "../../containers/AuthProvider";
// components:
import AuthModal from "../AuthModal";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import MobileNavigation from "./components/MobileNavigation";
import DesktopNavigation from "./components/DesktopNavigation";

/**
 * @description navigation component
 * @returns {JSX} component markup
 */
const Navigation: React.FC = () => {
  const theme = useTheme();
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { getIsAdmin, getIsAuthenticated } = useContext(objAuthContext);
  const { handleSignOut } = useAuthentication();
  const { bLightTheme, funcToggleTheme } = useCurrentTheme();
  const { bOpenModal, funcModalClose, funcModalOpen } = useModal();
  const [bSignUp, setBSignUp] = useState<boolean>(false);

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
        {bSignUp ? (
          <SignUpForm funcCloseModal={funcModalClose} setBSignUp={setBSignUp} />
        ) : (
          <SignInForm funcCloseModal={funcModalClose} setBSignUp={setBSignUp} />
        )}
      </AuthModal>
    </Fragment>
  );
};

export default Navigation;
