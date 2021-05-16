import React, { memo, Fragment } from "react";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
//styles:
import { useStyles } from "./style";

/**
 * @description background component
 * @returns {JSX} markup, background image
 */
const Background: React.FC = () => {
  const { bLightTheme } = useCurrentTheme();
  const classes = useStyles({ bLightTheme });
  return (
    <Fragment>
      {" "}
      <div className={classes.backgroundOverlay} />{" "}
      <div className={classes.backgroundBookList} />
    </Fragment>
  );
};

export default memo(Background);
