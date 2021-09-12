import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookDetails: {
      display: "flex",
      gap: `${theme.spacing(2)}px`,
      minHeight: 170,
    },
    bookDetails__image: {
      "& > img": {
        width: 124,
      },
    },
    bookDetails__description: {},
  })
);
