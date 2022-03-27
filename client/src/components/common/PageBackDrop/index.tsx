import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageBackDrop: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: `rgba(0, 0, 0, 0.1)`,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

/**
 * @description page backdrop, ( eg. display loading )
 * @param {Node} children jsx content
 * @returns {JSX} component markup
 */
const PageBackDrop: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.pageBackDrop}>{children}</div>;
};

export default PageBackDrop;
