import React from "react";

const Content = ({ content, client: { cache } }) => (
  <div>
    <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
    <script
      charSet="UTF-8"
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())}`
      }}
    />
    <script src="/client.js" charSet="UTF-8" />
  </div>
);

export default Content;
