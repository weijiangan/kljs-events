const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../../config/webpack.dev");

const router = express.Router();
const compiler = webpack(config);

router.use(
  webpackDevMiddleware(compiler, {
    logLevel: "warn",
    publicPath: config.output.publicPath
  })
);

router.use(webpackHotMiddleware(compiler));

router.use("/", express.static(path.join(__dirname, "..", "..", "dist")));

router.get("*", (req, res, next) => {
  res.sendFile(
    "index.html",
    { root: path.join(__dirname, "..", "..", "dist") },
    err => {
      if (err) next(err);
    }
  );
});

module.exports = router;
