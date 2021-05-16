import { createMuiTheme } from "@material-ui/core/styles";
import { pink, grey, orange } from "@material-ui/core/colors";

const muiThemeDark = createMuiTheme({
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
    text: {
      primary: grey[400],
      secondary: grey[400],
    },
  },
  components: {
    bookDetails: {
      background: grey[800],
      color: grey[400],
    },
  },
});

export default muiThemeDark;
