import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "node:path";
import { type Configuration } from "webpack";

import "webpack-dev-server";

const sourceDir = resolve(__dirname, "src");
const buildDir = resolve(__dirname, "dist");
const templatesDir = resolve(__dirname, "templates");
const publicPath = resolve(__dirname, "public");

const isProd = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: isProd ? "production" : "development",
  entry: resolve(sourceDir, "index.tsx"),
  output: {
    filename: isProd ? "[name].[contenthash].bundle.js" : "[name].bundle.js",
    asyncChunks: true,
    chunkLoading: "async-node",
    clean: true,
    chunkFormat: "commonjs",
    chunkFilename: isProd ? "[id].[contenthash].chunk.js" : "[id].chunk.js",
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
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
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
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${publicPath}/app.webmanifest`,
          to: `${buildDir}/app.webmanifest`,
        },
        {
          from: `${publicPath}/icons`,
          to: `${buildDir}/icons`,
        },
      ],
    }),
  ],
};

export default config;
