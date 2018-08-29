require("dotenv").config();
const webpack = require("webpack");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackIsomorphicDevMiddleware = require("webpack-isomorphic-dev-middleware");
const serverComponent = require("../src/server/ServerRoot");
const express = require("express");
const chalk = require("chalk");

const clientConfig = require("../config/webpack.client.dev.js");
const serverConfig = require("../config/webpack.server.dev.js");

let startedDevServer = false;
const devServer = express();
const serveFolders = ["build/client", "public"];

function startDevServer() {
  const DEV_PORT = process.env.DEV_PORT || 3000;
  devServer.listen(DEV_PORT, () => {
    startedDevServer = true;
    console.log(
      chalk`{green
  🚀 Started Development Server 🚀

  {bold http://localhost:${DEV_PORT}}

  Serving folders \n \t /${serveFolders.join("\n\t /")}
  ____________________________

}`
    );
  });
}

Promise.resolve()
  .then(() => {
    const clientCompiler = webpack(clientConfig);
    const serverCompiler = webpack(serverConfig);

    serverCompiler.hooks.done.tap("done", () => {
      if (!startedDevServer) {
        startDevServer();
      }
    });

    devServer.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      return next();
    });

    devServer.use(
      webpackIsomorphicDevMiddleware(clientCompiler, serverCompiler)
    );

    devServer.use(webpackHotMiddleware(clientCompiler));

    serveFolders.forEach(folder => {
      devServer.use(express.static(folder));
    });

    devServer.use(serverComponent.default);
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err);
    }
    process.exit(1);
  });
