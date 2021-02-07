import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components:
import BookList from "./components/BookList";
import AdminPage from "./components/AdminPage";
import Navigation from "./components/Navigation";
import BookListNew from "./components/BookListNew";

// Apollo client setup:
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={BookList} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/list-new" component={BookListNew} />
            <Route render={() => <h4>Page not found.</h4>} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
