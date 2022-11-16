const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["solid"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.s?css/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: { loader: "file-loader" },
      },
    ],
  },
  resolve: {
    //resolve these extensions in order
    //If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
    //which is what enables users to leave off the extension when importing
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // to map errors to file source instead of bundle.js
  devtool: "inline-source-map",
  devServer: {
    static: {
      //tell webpack dev server where to serve your static content
      publicPath: "/build",
      directory: path.resolve(__dirname, "build"),
    },
    proxy: {
      "/": "http://[::1]:3000",
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
