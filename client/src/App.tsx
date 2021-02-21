import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloProvider from "./ApolloProvider/ApolloProvider";

//components:
import BookListPage from "./pages/BookListPage";
import AdminPage from "./pages/AdminPage";
import Navigation from "./components/Navigation";
//styles:
import GlobalStyle from "./GlobalStyle/GlobalStyle";

const App: React.FC = () => {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route path="/" exact component={BookListPage} />
          <Route path="/admin" component={AdminPage} />
          <Route render={() => <h4>Page not found.</h4>} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
