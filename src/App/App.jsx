import React, { PureComponent } from "react";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import Layout from "../routes/Layout";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({
    uri: "https://graphql.sfanytime.com"
  }),
  ssrForceFetchDelay: 100,
  connectToDevTools: true
});

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
