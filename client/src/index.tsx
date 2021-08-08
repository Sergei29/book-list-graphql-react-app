import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloProvider from "./graphql/ApolloProvider/ApolloProvider";
import { AuthProvider } from "./containers/AuthProvider";
import App from "./containers/App/App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
