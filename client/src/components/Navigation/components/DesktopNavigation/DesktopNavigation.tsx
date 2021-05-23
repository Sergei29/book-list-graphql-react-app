import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { MuiSelectedTheme } from "../../../../types/types";
// components:
import GitHubButton from "../../../GitHubButton";
import Authentication from "../../../Authentication";
import Switch from "../../../Switch";
// styles:
import { useStyles } from "./style";

const { LIGHT, DARK } = MuiSelectedTheme;

type Props = {
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
          <NavLink exact to="/" className={classes.navLink}>
            Home
          </NavLink>
        </li>
        {bLoggedIn && (
          <li className={classes.navigation__list__item}>
            <NavLink to="/admin" className={classes.navLink}>
              Admin
            </NavLink>
          </li>
        )}
        <li className={classes.navigation__list__item}>
          <Authentication
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
