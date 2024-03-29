import { createTheme } from "@material-ui/core/styles";
import { pink, grey, orange } from "@material-ui/core/colors";

export const muiThemeDark = createTheme(
  {},
  {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            WebkitFontSmoothing: "auto",
          },
          ul: {
            padding: 0,
            margin: 0,
          },
        },
      },
      MuiInputBase: {
        input: {
          "&:-webkit-autofill": {
            transitionDelay: "9999s",
            transitionProperty: "background-color, color",
          },
        },
      },
    },
    palette: {
      primary: {
        main: grey[400],
        light: grey[300],
        dark: grey[500],
      },
      secondary: {
        main: pink[800], //raspberry
        light: pink[700],
        dark: pink[900], // bordeau
      },
      info: {
        main: orange[100], //yellow
        light: "#ffffe4",
        dark: "#cbae82",
      },
    },
    components: {
      bookButton: { color: grey[400] },
      bookDetails: {
        background: grey[800],
        color: grey[400],
      },
      bookList: {
        backgroundImage: { opacity: 1 },
        overlay: { background: "rgba(0,0,0, 0.9)" },
      },
      mobileNavigation: {
        background: pink[800],
        color: "#fff",
      },
      page: {
        background: grey[800],
      },
    },
  }
);
