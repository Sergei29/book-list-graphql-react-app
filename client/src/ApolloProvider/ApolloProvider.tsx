import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderHOC,
} from "@apollo/client";

// Apollo client setup:
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};

const ApolloProvider: React.FC<Props> = ({ children }) => {
  return <ApolloProviderHOC client={client}>{children}</ApolloProviderHOC>;
};

export default ApolloProvider;
