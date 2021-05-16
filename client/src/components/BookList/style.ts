import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { animationShake } from "../../Theme/commonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes shake": animationShake,
    bookList: {
      position: "relative",
      zIndex: 2,
    },
    bookList__item: {
      display: "inline-block",
      margin: theme.spacing(1.5),
      padding: theme.spacing(1.25),
      borderRadius: 4,
      border: `1px solid ${theme.palette.secondary.main}`,
      boxShadow: `1px 2px 3px rgba(0, 0, 0, 0.3)`,
      cursor: "pointer",
      color: theme.palette.secondary.main,
      fontWeight: 500,
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
      "&:hover": {
        color: theme.components?.bookButton?.color,
        backgroundColor: theme.palette.secondary.main,
        transform: `scale(1.1)`,
      },
      "&:focus": {
        color: theme.palette.primary.main,
        animation: `$shake 0.5s`,
      },
      "&:active": {
        color: theme.palette.primary.main,
        animation: `$shake 0.5s`,
      },
    },
  })
);
