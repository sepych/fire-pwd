const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EncodingPlugin = require('webpack-encoding-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    entry: path.join(__dirname, "src", "index.js"),
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: "production",
    resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
    devServer: { contentBase: path.join(__dirname, "src") },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
    ],
  },
  {
    entry: {
      background: './src/background.js',
      content: './src/content.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/build',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "manifest.json", to: "manifest.json" },
        ],
      }),
    ],
  },
];
