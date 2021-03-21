import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkToGithub: {
      textDecoration: "none",
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      color: theme.palette.common.white,
      display: "flex",
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  })
);
