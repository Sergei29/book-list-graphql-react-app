import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import useCurrentUser from "../../hooks/useCurrentUser/useCurrentUser";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
import { MuiSelectedTheme } from "../../types/types";
// components:
import GitHubButton from "../GitHubButton";
import Authentication from "../Authentication";
import Switch from "../Switch";
// styles:
import { useStyles } from "./style";

const { LIGHT, DARK } = MuiSelectedTheme;

type Props = {};

/**
 * @description navigation component
 * @returns {JSX} component markup
 */
const Navigation: React.FC<Props> = () => {
  const classes = useStyles();
  const { bLoggedIn, handleLogout } = useCurrentUser();
  const { bLightTheme, funcToggleTheme } = useCurrentTheme();

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
          <Authentication bLoggedIn={bLoggedIn} handleLogout={handleLogout} />
        </li>
        <li className={classes.navigation__list__item}>
          <span>
            <GitHubButton bLightTheme={bLightTheme} />
          </span>
        </li>
        <li>
          <Tooltip title={`switch theme to ${bLightTheme ? DARK : LIGHT}`}>
            <Switch checked={bLightTheme} onChange={funcToggleTheme} />
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
