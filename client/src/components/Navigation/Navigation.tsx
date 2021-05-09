import React from "react";
import { NavLink } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser/useCurrentUser";
// components:
import GitHubButton from "../GitHubButton";
import Authentication from "../Authentication";
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
            <GitHubButton />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
