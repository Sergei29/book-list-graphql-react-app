import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { objAuthContext } from "../../containers/AuthProvider";
import useCurrentTheme from "../../hooks/useCurrentTheme/useCurrentTheme";
import muiThemeLight from "../../Theme/muiThemeLight";
import muiThemeDark from "../../Theme/muiThemeDark";
//components:
import BookListPage from "../../pages/BookListPage";
import AdminPage from "../../pages/AdminPage";
import Navigation from "../../components/Navigation";
import SignUpCompletePage from "../../pages/SignUpCompletePage";
import EmailConfirmedPage from "../../pages/EmailConfirmedPage";
import PageBackground from "../../components/PageBackground";
// style:
import { useStyles } from "./style";

/**
 * @description application component
 * @returns {JSX} application markup
 */
const App: React.FC = () => {
  const classes = useStyles();
  const { bLightTheme } = useCurrentTheme();
  const { getIsAdmin } = useContext(objAuthContext);

  return (
    <ThemeProvider theme={bLightTheme ? muiThemeLight : muiThemeDark}>
      <CssBaseline />
      <PageBackground />
      <Container className={classes.mainContainer}>
        <Navigation />
        <Switch>
          <Route path="/" exact component={BookListPage} />
          <Route path="/signup-complete" component={SignUpCompletePage} />
          <Route path="/confirm/:strUserId" component={EmailConfirmedPage} />
          {getIsAdmin() && <Route path="/admin" component={AdminPage} />}
          <Route render={() => <h4>Page not found.</h4>} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
