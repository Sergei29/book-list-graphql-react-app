import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const BACKGROUND_IMG_URL = `https://res.cloudinary.com/dlw2jic1w/image/upload/v1648406178/image_list_images/lincoln-freitas-qgpCWCjaC9w-unsplash_igvcet.jpg`;

export const useStyles = makeStyles((theme: Theme) => {
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
      backgroundImage: `url(${BACKGROUND_IMG_URL})`,
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
