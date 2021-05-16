import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import { pink, grey, orange } from "@material-ui/core/colors";

const muiThemeLight = createMuiTheme({
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
      main: grey[800], //darkGrey
      light: grey[700],
      dark: grey[900],
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
      primary: grey[800],
      secondary: "#fff",
    },
  },
  components: {
    bookDetails: {
      background: pink[800],
      color: "#fff",
    },
  },
});

export default muiThemeLight;
