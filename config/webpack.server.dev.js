const path = require("path");
const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
const baseConfig = require("./webpack.base");
import dotenv from "dotenv";
dotenv.config();

module.exports = {
  name: "server",
  mode: process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  entry: [require.resolve("./polyfills"), paths.serverIndexJs],
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: true
  },
  output: {
    path: path.resolve(paths.serverBuild)
  },
  module: baseConfig.module,
  resolve: baseConfig.resolve,
  plugins: baseConfig.plugins
};
