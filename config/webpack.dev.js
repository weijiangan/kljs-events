const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: ["webpack-hot-middleware/client", "./src/client/index.js"],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /node_modules|packages/,
            test: /\.js$/,
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { modules: true } }
            ]
          },
          {
            loader: "file-loader",
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.BABEL_ENV": JSON.stringify("development")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
