import React from "react";
import {
  ApolloClient,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
} from "@apollo/client";
import { cache } from "./cache";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  // credentials: "include",
});

/**
 * @description Apollo client setup based on auth token
 * @returns {Object} new instance of ApolloClient
 */
const getClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "/graphql",
      credentials: "include",
    }),
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested children components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "/graphql",
      credentials: "include",
    }),
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });
  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
