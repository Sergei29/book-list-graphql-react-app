import React, { memo } from "react";
//styles:
import { useStyles } from "./style";

/**
 * @description background component
 * @returns {JSX} markup, background image
 */
const Background: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.backgroundBookList} />;
};

export default memo(Background);
