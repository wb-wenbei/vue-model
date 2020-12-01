"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        // target: "http://rc.hq.huanwei.tidecloud.com/",
        target: "http://192.168.0.110:13200",
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
  configureWebpack: {
    name: "vue-project",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    externals: {
      AMap: "AMap"
    }
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
