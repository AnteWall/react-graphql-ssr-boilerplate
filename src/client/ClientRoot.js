import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { BrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({
    uri: process.env.GRAPHQL_SERVER
  }),
  ssrForceFetchDelay: 100,
  connectToDevTools: true
});

const ClientRoot = () => (
  <ApolloProvider client={client}>
    <h4>If this text renders, clinet has taken over!</h4>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ApolloProvider>
);

export default ClientRoot;
