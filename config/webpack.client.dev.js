const path = require("path");
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const merge = require("lodash/merge");

const paths = require("./paths");
const baseConfig = require("./webpack.base");

module.exports = {
  mode: "development",
  watch: true,
  name: "client",
  devtool: "cheap-module-source-map",
  entry: [
    require.resolve("./polyfills"),
    "webpack-hot-middleware/client",
    paths.appIndexJs
  ],
  output: {
    path: path.resolve(paths.appBuild),
    filename: "client.js",
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  resolve: merge(baseConfig.resolve, {
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  }),
  module: baseConfig.module,
  plugins: merge(baseConfig.plugins, [
    new webpack.HotModuleReplacementPlugin()
  ]),
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
