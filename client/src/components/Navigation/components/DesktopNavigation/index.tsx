import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { MuiSelectedTheme } from "../../../../types/types";
import { OBJ_TEST_IDS } from "../../../../constants";
// components:
import GitHubButton from "../../../GitHubButton";
import AuthLink from "../../../AuthLink";
import Switch from "../../../common/Switch";
// styles:
import { useStyles } from "./style";

const { LIGHT, DARK } = MuiSelectedTheme;

export type Props = {
  bAdmin: boolean;
  bLoggedIn: boolean;
  bLightTheme: boolean;
  funcModalOpen: () => void;
  funcToggleTheme: () => void;
  handleLogout: () => Promise<void>;
};

/**
 * @description navigation for desktop
 * @param {Object} props component props
 * @returns {JSX} component markup
 */
const DesktopNavigation: React.FC<Props> = ({
  bAdmin,
  bLoggedIn,
  bLightTheme,
  funcModalOpen,
  funcToggleTheme,
  handleLogout,
}) => {
  const classes = useStyles();

  return (
    <nav
      className={classes.navigation}
      data-testid={OBJ_TEST_IDS.navigationDesktop}
    >
      <ul className={classes.navigation__list}>
        <li className={classes.navigation__list__item}>
          <NavLink to="/" className={classes.navLink}>
            Home
          </NavLink>
        </li>
        {bAdmin && (
          <li className={classes.navigation__list__item}>
            <NavLink to="/admin" className={classes.navLink}>
              Admin
            </NavLink>
          </li>
        )}
        <li className={classes.navigation__list__item}>
          <AuthLink
            bLoggedIn={bLoggedIn}
            funcModalOpen={funcModalOpen}
            handleLogout={handleLogout}
          />
        </li>
        <li className={classes.navigation__list__item}>
          <span>
            <GitHubButton bLightTheme={bLightTheme} />
          </span>
        </li>
        <li className={classes.navigation__list__item_last}>
          <Tooltip title={`switch theme to ${bLightTheme ? DARK : LIGHT}`}>
            <Switch
              checked={bLightTheme}
              onChange={funcToggleTheme}
              data-testid={OBJ_TEST_IDS.themeSwitch}
            />
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
