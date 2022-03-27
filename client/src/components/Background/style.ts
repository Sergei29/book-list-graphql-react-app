import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const imgUrl = `${process.env.PUBLIC_URL}/images/lincoln-freitas-qgpCWCjaC9w-unsplash.jpg`;
  const objBaseStyle: any = {
    [theme.breakpoints.up("md")]: {
      width: "60vw",
    },
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: "100%",
  };

  return createStyles({
    backgroundBookList: {
      ...objBaseStyle,
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover",
      opacity: theme.components?.bookList?.backgroundImage.opacity,
    },
    backgroundOverlay: {
      ...objBaseStyle,
      zIndex: 1,
      background: theme.components?.bookList?.overlay.background,
    },
  });
});
