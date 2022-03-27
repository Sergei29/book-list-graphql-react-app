import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { objAuthContext } from "../../containers/AuthProvider";
import { muiThemeDark, muiThemeLight } from "../../Theme";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import PageBackground from "../../components/PageBackground";
import Navigation from "../../components/Navigation";
import AdminPage from "../../pages/AdminPage";
import BookListPage from "../../pages/BookListPage";
import EmailConfirmedPage from "../../pages/EmailConfirmedPage";
import SignUpCompletePage from "../../pages/SignUpCompletePage";
import { useStyles } from "./style";

function App() {
  const { bLightTheme } = useCurrentTheme();
  const { getIsAdmin } = useContext(objAuthContext);
  const classes = useStyles();

  const customTheme = bLightTheme ? muiThemeLight : muiThemeDark;

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <PageBackground />
      <Container className={classes.mainContainer}>
        <Navigation />
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="signup-complete" element={<SignUpCompletePage />} />
          <Route path="confirm">
            <Route path=":strUserId" element={<EmailConfirmedPage />} />
          </Route>
          {getIsAdmin() && <Route path="admin" element={<AdminPage />} />}
          <Route path="*" element={<h4>Page not found.</h4>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
