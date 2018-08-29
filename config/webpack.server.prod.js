const path = require("path");
const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
const baseConfig = require("./webpack.base");

module.exports = {
  name: "server",
  mode: "production",
  devtool: false,
  entry: [
    require.resolve("./polyfills"),
    "@babel/register",
    paths.serverIndexJs
  ],
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: true
  },
  optimization: {
    minimize: true,
    nodeEnv: "production"
  },
  output: {
    path: path.resolve(paths.serverBuild)
  },
  module: baseConfig.module,
  resolve: baseConfig.resolve,
  plugins: baseConfig.plugins
};
