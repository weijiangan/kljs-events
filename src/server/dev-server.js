const path = require("path");
const express = require("express");

const router = express.Router();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("../../config/webpack.dev");
  const compiler = webpack(config);

  router.use(
    webpackDevMiddleware(compiler, {
      logLevel: "warn",
      publicPath: config.output.publicPath
    })
  );

  router.use(webpackHotMiddleware(compiler));
}

router.use("/", express.static(path.join(__dirname, "..", "..", "dist")));

// for SPAs: route non-file routes (without extension) to index
router.get("^[^\\.]+$", (req, res, next) => {
  // for use with graphql-yoga
  if (req.url === "/graphql") return next();
  res.sendFile(
    "index.html",
    { root: path.join(__dirname, "..", "..", "dist") },
    err => {
      if (err) next(err);
    }
  );
});

module.exports = router;
