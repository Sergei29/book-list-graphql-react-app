import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { animationShake } from "../../Theme/commonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes shake": animationShake,
    authLink: {},
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
    authButtonMobile__icon: {
      color: "inherit",
      paddingLeft: theme.spacing(2),
    },
    authButtonMobile__text: {
      paddingLeft: theme.spacing(2),
    },
  })
);
