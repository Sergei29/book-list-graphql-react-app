import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      columnGap: `${theme.spacing(2)}px`,
      "& > p": {
        color: theme.palette.secondary.main,
      },
    },
  })
);
