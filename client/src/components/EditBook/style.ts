import {
  makeStyles,
  createStyles,
  Theme,
  lighten,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editBookModal__content: {
      backgroundColor: lighten(theme.palette.common.black, 0.02),
    },
    editBookModal__title: {
      display: "flex",
      backgroundColor: lighten(theme.palette.common.black, 0.02),
      color: theme.palette.info.main,
      borderBottom: `1px solid ${theme.palette.info.main}`,
    },
  })
);
