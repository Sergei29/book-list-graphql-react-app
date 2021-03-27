import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloProvider from "./ApolloProvider/ApolloProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import muiTheme from "./Theme/muiTheme";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
