import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  })
);
