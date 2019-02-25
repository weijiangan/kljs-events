const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../../config/webpack.dev");

const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    logLevel: "warn",
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.use("/", express.static(path.join(__dirname, "..", "..", "dist")));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
