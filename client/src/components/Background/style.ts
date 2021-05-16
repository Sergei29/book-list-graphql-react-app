import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const imgUrl = `${process.env.PUBLIC_URL}/images/lincoln-freitas-qgpCWCjaC9w-unsplash.jpg`;
  const objBaseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: "60vw",
  };

  return createStyles({
    backgroundBookList: {
      ...objBaseStyle,
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover",
      opacity: (props: { bLightTheme: boolean }) =>
        props.bLightTheme ? 0.3 : 1,
    },
    backgroundOverlay: {
      ...objBaseStyle,
      zIndex: 1,
      background: (props: { bLightTheme: boolean }) =>
        props.bLightTheme ? `rgba(0,0,0, 0.1)` : `rgba(0,0,0, 0.9)`,
    },
  });
});
