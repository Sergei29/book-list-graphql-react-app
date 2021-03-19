import { createMuiTheme } from "@material-ui/core/styles";
import { pink, grey, orange } from "@material-ui/core/colors";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      light: grey[700],
      dark: grey[900],
    },
    secondary: {
      main: pink[800],
      light: pink[700],
      dark: pink[900],
    },
    info: {
      main: orange[100],
      light: "#ffffe4",
      dark: "#cbae82",
    },
  },
});

export default muiTheme;
