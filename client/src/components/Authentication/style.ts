import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { animationShake } from "../../Theme/commonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes shake": animationShake,
    authLink: {},
    authHeading: {
      marginBottom: theme.spacing(2),
      color: theme.palette.info.main,
    },
    authHelperText: {
      color: theme.palette.info.main,
      fontSize: ".75rem",
      marginBottom: theme.spacing(1),
    },
    authButton: {
      "&:hover": {
        transform: `scale(1.1)`,
      },
      "&:focus": {
        animation: `$shake 0.5s`,
      },
      color: theme.palette.secondary.main,
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
    },
  })
);
