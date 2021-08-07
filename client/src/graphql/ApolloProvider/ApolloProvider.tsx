import React from "react";
import {
  ApolloClient,
  ApolloProvider as ApolloProviderHOC,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { cache } from "./cache";
import useAuthToken from "../../hooks/useAuthToken/useAuthToken";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  credentials: "include",
});

/**
 * @description looks for auth token in cookies, if exists sets it in graphql request headers
 * @returns {Array} updated ApolloLink
 */
const authMiddleware = (strAuthToken: string) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (strAuthToken) {
      operation.setContext({
        headers: {
          authorization: `${strAuthToken}`,
        },
      });
    }
    return forward(operation);
  });

/**
 * @description Apollo client setup based on auth token
 * @param {String} strAuthToken auth token
 * @returns {Object} new instance of ApolloClient
 */
const getClient = (strAuthToken: string) =>
  new ApolloClient({
    link: authMiddleware(strAuthToken).concat(httpLink),
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

/**
 * @description Apollo instance provider for the application
 * @param {Node} {children nested children components}
 * @returns {JSX} application components with provided client instance
 */
const ApolloProvider: React.FC = ({ children }) => {
  const { strAuthToken } = useAuthToken();
  const client = getClient(strAuthToken);
  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
