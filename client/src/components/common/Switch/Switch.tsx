import React from "react";
import MuiSwitch, { SwitchProps } from "@material-ui/core/Switch";
// styles:
import { useStyles } from "./style";

/**
 * @description switch component
 * @returns {JSX} markup
 */
const Switch: React.FC<SwitchProps> = ({ ...restSwitchProps }) => {
  const classes = useStyles();
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...restSwitchProps}
    />
  );
};

export default Switch;
