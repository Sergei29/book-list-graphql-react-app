import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => {
  return createStyles({
    mainContainer: {
      position: "relative",
      zIndex: 1,
    },
  });
});
