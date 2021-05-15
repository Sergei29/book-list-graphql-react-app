import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import useCurrentUser from "./hooks/useCurrentUser/useCurrentUser";
import useCurrentTheme from "./hooks/useCurrentTheme/useCurrentTheme";
import muiThemeLight from "./Theme/muiThemeLight";
import muiThemeDark from "./Theme/muiThemeDark";
//components:
import BookListPage from "./pages/BookListPage";
import AdminPage from "./pages/AdminPage";
import Navigation from "./components/Navigation";

/**
 * @description application component
 * @returns {JSX} application markup
 */
const App: React.FC = () => {
  const { bLoggedIn } = useCurrentUser();
  const { bLightTheme } = useCurrentTheme();

  return (
    <ThemeProvider theme={bLightTheme ? muiThemeLight : muiThemeDark}>
      <CssBaseline />
      <Container>
        <Navigation />
        <Switch>
          <Route path="/" exact component={BookListPage} />
          {bLoggedIn && <Route path="/admin" component={AdminPage} />}
          <Route render={() => <h4>Page not found.</h4>} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
