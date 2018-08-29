import React from "react";
import { render, hydrate } from "react-dom";
import registerServiceWorker from "../registerServiceWorker";

import ClientRoot from "./ClientRoot";

hydrate(<ClientRoot />, document.getElementById("content"));

// Hot Module Replacement
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./ClientRoot", () => {
    const NewApp = require("./ClientRoot").default;
    render(<NewApp />, document.getElementById("content"));
  });
}

registerServiceWorker();
