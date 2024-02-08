import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "node:path";
import type { Configuration } from "webpack";

import "webpack-dev-server";

const sourceDir = resolve(__dirname, "src");
const buildDir = resolve(__dirname, "dist");
const templatesDir = resolve(__dirname, "templates");

const isProd = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: isProd ? "production" : "development",
  entry: resolve(sourceDir, "index.tsx"),
  output: {
    filename: "[name].bundle.js",
    asyncChunks: true,
    chunkLoading: "async-node",
    clean: true,
    chunkFormat: "commonjs",
    chunkFilename: "[id].chunk.js",
    path: buildDir,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: "web",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(templatesDir, "index.ejs"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
    }),
  ],
};

export default config;
