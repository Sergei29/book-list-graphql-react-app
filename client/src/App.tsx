import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useCurrentUser from "./hooks/useCurrentUser/useCurrentUser";
//components:
import BookListPage from "./pages/BookListPage";
import AdminPage from "./pages/AdminPage";
import Navigation from "./components/Navigation";

/**
 * @description application component
 * @returns {JSX} application markup
 */
const App: React.FC = () => {
  const { bLoggedIn, handleLogout } = useCurrentUser();

  return (
    <>
      <CssBaseline />
      <Container>
        <Navigation bLoggedIn={bLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact component={BookListPage} />
          {bLoggedIn && <Route path="/admin" component={AdminPage} />}
          <Route render={() => <h4>Page not found.</h4>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
