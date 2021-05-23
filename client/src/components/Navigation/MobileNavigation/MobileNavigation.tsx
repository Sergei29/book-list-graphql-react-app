import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import HomeIcon from "@material-ui/icons/Home";
// components:
import GitHubButton from "../../GitHubButton";
import Authentication from "../../Authentication";
// styles:
import { useStyles } from "./style";

type Props = {
  bLightTheme: boolean;
  bLoggedIn: boolean;
  funcToggleTheme: () => void;
  handleLogout: () => Promise<void>;
};
const MobileNavigation: React.FC<Props> = ({
  bLoggedIn,
  bLightTheme,
  funcToggleTheme,
  handleLogout,
}) => {
  const classes = useStyles();
  const [bOpenMenu, setbOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = () => setbOpenMenu(true);

  const handleMenuClose = () => setbOpenMenu(false);

  return (
    <div className={classes.mobileNavigation}>
      <IconButton
        onClick={handleMenuOpen}
        className={classes.mobileNavigation__button}
      >
        <MenuIcon color="secondary" />
      </IconButton>
      <Drawer open={bOpenMenu} onClose={handleMenuClose}>
        <List>
          <ListItem button>
            <NavLink exact to="/" className={classes.mobileNavigation__navLink}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <span>Home</span>
            </NavLink>
          </ListItem>
          {bLoggedIn && (
            <ListItem button>
              <NavLink
                exact
                to="/admin"
                className={classes.mobileNavigation__navLink}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <span>Admin</span>
              </NavLink>
            </ListItem>
          )}
          <Authentication bLoggedIn={bLoggedIn} handleLogout={handleLogout} />
          <ListItem>
            <GitHubButton bLightTheme={bLightTheme} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
