import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      position: "relative",
      zIndex: 1,
    },
  })
);
