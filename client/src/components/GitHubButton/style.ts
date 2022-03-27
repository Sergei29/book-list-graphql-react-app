import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { animationShake } from "../../Theme/commonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes shake": animationShake,
    linkToGithub: {
      "&:hover": {
        transform: `scale(1.1)`,
      },
      "&:focus": {
        animation: `$shake 0.5s`,
      },
      textDecoration: "none",
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      color: (props: { bLightTheme: boolean }) =>
        props.bLightTheme
          ? theme.palette.common.white
          : theme.palette.secondary.main,
      display: "flex",
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
      columnGap: `${theme.spacing(1)}px`,
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
    },
    linkToGithub__text: {
      color: "inherit",
    },
  })
);
