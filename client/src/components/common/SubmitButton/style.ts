import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitButton: {
      textTransform: "capitalize",
      color: theme.palette.info.main,
      "&:disabled": {
        pointerEvents: "auto",
        cursor: "not-allowed",
        color: theme.palette.info.main,
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.9,
        "&:hover": {
          color: theme.palette.info.main,
          backgroundColor: theme.palette.secondary.main,
          transform: "scale(1.01)",
        },
      },
    },
  })
);
