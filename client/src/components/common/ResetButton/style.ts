import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetButton: {
      textTransform: "capitalize",
      color: theme.palette.info.main,
    },
  })
);
