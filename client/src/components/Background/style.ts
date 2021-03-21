import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const imgUrl = `${process.env.PUBLIC_URL}/images/lincoln-freitas-qgpCWCjaC9w-unsplash.jpg`;

  return createStyles({
    backgroundBookList: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover",
      opacity: 0.3,
      width: "60vw",
    },
  });
});
