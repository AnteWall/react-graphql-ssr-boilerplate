const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const merge = require("lodash/merge");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const paths = require("./paths");
const baseConfig = require("./webpack.base");

module.exports = {
  mode: "development",
  bail: true,
  name: "client",
  devtool: false,
  entry: [require.resolve("./polyfills"), paths.appIndexJs],
  output: {
    path: path.resolve(paths.appBuild),
    filename: "client.js",
    chunkFilename: "[name].js"
  },
  resolve: merge(baseConfig.resolve, {
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  }),
  optimization: {
    minimize: true,
    nodeEnv: "production"
  },
  module: baseConfig.module,
  plugins: merge(baseConfig.plugins, [
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]),
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
