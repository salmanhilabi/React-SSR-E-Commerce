const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = require("./config.json");

module.exports = {
  target: "node",
  mode: config.enviorment,
  entry: ["./index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/client/assets/images", to: "public/assets/images" },
      ],
    }),
  ],
  externals: [webpackNodeExternals()],
};
