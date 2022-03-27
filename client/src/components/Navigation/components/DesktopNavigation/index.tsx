import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { MuiSelectedTheme } from "../../../../types/types";
// components:
import GitHubButton from "../../../GitHubButton";
import AuthLink from "../../../AuthLink";
import Switch from "../../../common/Switch";
// styles:
import { useStyles } from "./style";

const { LIGHT, DARK } = MuiSelectedTheme;

type Props = {
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
    <nav className={classes.navigation}>
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
            <Switch checked={bLightTheme} onChange={funcToggleTheme} />
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
