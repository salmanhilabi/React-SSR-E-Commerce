const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const config = require("./config.json");

module.exports = {
  target: "web",
  mode: config.enviorment,
  entry: ["./src/client/client.js", "./src/client/assets/scss/styles.scss"],
  output: {
    filename: "client_bundle.js",
    path: path.resolve(__dirname, "build/public"),
    chunkFilename: "[name].[chunkhash].js",
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoprefixer],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images",
              limit: 8192, // in bytes
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts",
              limit: 8192, // in bytes
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: "./assets/css/styles.min.css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
};
