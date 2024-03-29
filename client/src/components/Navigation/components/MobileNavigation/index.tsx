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
  bLightTheme: boolean;
  bLoggedIn: boolean;
  funcToggleTheme: () => void;
  funcModalOpen: () => void;
  handleLogout: () => Promise<void>;
};

/**
 * @description navigation for mobile screen
 * @param {Object} props component props
 * @returns {JSX} component markup
 */
const MobileNavigation: React.FC<Props> = ({
  bAdmin,
  bLoggedIn,
  bLightTheme,
  funcToggleTheme,
  funcModalOpen,
  handleLogout,
}) => {
  const classes = useStyles();
  const [bOpenMenu, setbOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = () => setbOpenMenu(true);

  const handleMenuClose = () => setbOpenMenu(false);

  return (
    <div
      className={classes.mobileNavigation}
      data-testid={OBJ_TEST_IDS.navigationMobile}
    >
      <IconButton
        onClick={handleMenuOpen}
        className={classes.mobileNavigation__button}
        data-testid={OBJ_TEST_IDS.navigationMobileToggle}
      >
        <MenuIcon color="secondary" />
      </IconButton>
      <Drawer
        open={bOpenMenu}
        onClose={handleMenuClose}
        classes={{ paper: classes.mobileNavigation__drawer }}
      >
        <List>
          <ListItem button classes={{ root: classes.listItemRoot }}>
            <NavLink to="/" className={classes.mobileNavigation__navLink}>
              <ListItemIcon
                classes={{ root: classes.mobileNavigation__navLink__icon }}
              >
                <HomeIcon />
              </ListItemIcon>
              <span>Home</span>
            </NavLink>
          </ListItem>
          {bAdmin && (
            <ListItem button classes={{ root: classes.listItemRoot }}>
              <NavLink
                to="/admin"
                className={classes.mobileNavigation__navLink}
              >
                <ListItemIcon
                  classes={{ root: classes.mobileNavigation__navLink__icon }}
                >
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <span>Admin</span>
              </NavLink>
            </ListItem>
          )}
          <AuthLink
            bLoggedIn={bLoggedIn}
            handleLogout={handleLogout}
            funcModalOpen={funcModalOpen}
          />
          <ListItem classes={{ root: classes.listItemRoot }}>
            <GitHubButton bLightTheme={bLightTheme} />
          </ListItem>
          <Divider />
          <ListItem>
            <Switch
              checked={bLightTheme}
              onChange={funcToggleTheme}
              data-testid={OBJ_TEST_IDS.themeSwitchMobile}
            />
            <ListItemText>{`switch to ${
              bLightTheme ? DARK : LIGHT
            }`}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
