import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloProvider from "./ApolloProvider/ApolloProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import muiTheme from "./Theme/muiTheme";

//components:
import BookListPage from "./pages/BookListPage";
import AdminPage from "./pages/AdminPage";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <Navigation />
          <Switch>
            <Route path="/" exact component={BookListPage} />
            <Route path="/admin" component={AdminPage} />
            <Route render={() => <h4>Page not found.</h4>} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
