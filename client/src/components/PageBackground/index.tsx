import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { OBJ_TEST_IDS } from "../../constants";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageBackground: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: theme.components?.page?.background,
      zIndex: 0,
    },
  })
);

const PageBackground = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.pageBackground}
      data-testid={OBJ_TEST_IDS.pageBackground}
    />
  );
};

export default PageBackground;
