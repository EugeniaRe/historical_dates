const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]--[hash:base64:5]",
                },
                importLoaders: 1,
              },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"), // Добавлено явное указание реализации
                sassOptions: {
                  fiber: false, // Fiber больше не требуется в новых версиях
                },
              },
            },
          ],
        },
        {
          test: /\.css$/, // Для Swiper CSS
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      !isDevelopment &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true, // Добавлено для правильной работы React Router
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
  };
};
