import React, { memo, Fragment } from "react";
//styles:
import { useStyles } from "./style";

/**
 * @description background component
 * @returns {JSX} markup, background image
 */
const PageBackground: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.backgroundOverlay} />
      <div className={classes.backgroundBookList} />
    </Fragment>
  );
};

export default memo(PageBackground);
