import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      minWidth: "40%",
    },
    modal__content: {
      width: "100%",
    },
  })
);
