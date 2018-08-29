// This example uses React Router v4, although it should work
// equally well with other routers that support SSR
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { Helmet } from "react-helmet";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { StaticRouter } from "react-router";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import Layout from "../routes/Layout";
import Content from "../routes/Content";

const sheet = new ServerStyleSheet();
const client = new ApolloClient({
  ssrMode: true,
  // Remember that this is the interface the SSR server will use to connect to the
  // API server, so we need to ensure it isn't firewalled, etc
  link: createHttpLink({
    uri: process.env.GRAPHQL_SERVER,
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const ServerRoot = async (request, response) => {
  const RouterContext = {};
  // The client-side App will instead use <BrowserRouter>
  const RootComponent = (
    <ApolloProvider client={client}>
      <h4>If this text renders, Server is rendering this data!</h4>
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={request.url} context={RouterContext}>
          <Layout />
        </StaticRouter>
      </StyleSheetManager>
    </ApolloProvider>
  );

  renderToStringWithData(RootComponent)
    .then(content => {
      response.status(200);

      const contentData = ReactDOMServer.renderToStaticMarkup(
        <Content content={content} client={client} />
      );
      const helmet = Helmet.renderStatic();
      if (RouterContext.url) {
        // 301 REDIRECT
        response.redirect(301, RouterContext.url);
      } else {
        response.status(RouterContext.status || 200);
        response.send(`
      <!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
          <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${sheet.getStyleTags()}
          </head>
          <body ${helmet.bodyAttributes.toString()}>
            ${contentData}
          </body>
      </html>`);
      }

      response.end();
    })
    .catch(e => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      response.status(500);
      response.end(
        `An error occurred with the following stack trace:\n\n${e.stack}`
      );
    });
};

export default ServerRoot;
