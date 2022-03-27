import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { objAuthContext } from "../../containers/AuthProvider";
import { muiThemeDark, muiThemeLight } from "../../Theme";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import { useStyles } from "./style";

function App() {
  const { bLightTheme } = useCurrentTheme();
  const { getIsAdmin } = useContext(objAuthContext);
  const classes = useStyles();

  const customTheme = bLightTheme ? muiThemeLight : muiThemeDark;

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div
        className={classes.mainContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Oups! This App is temporary broken</h1>
        <p>Sorry guys, I am currently fixing it...</p>
        <div style={{ height: "50vh" }}>
          <img
            style={{ height: "100%" }}
            src="https://i.imgur.com/FOeYt4E.png"
            alt="broken"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
