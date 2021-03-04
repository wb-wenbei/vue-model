"use strict";
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

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
        target: "http://hongqiao.shequpingjia.tidecloud.com/",
        // target: "http://192.168.0.110:13200",
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
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|ttf)?$/i, // 哪些文件要压缩
        filename: "[path].gz[query]", // 压缩后的文件名
        algorithm: "gzip", // 使用gzip压缩
        threshold: 10240, //对超过10k的数据压缩
        minRatio: 1, // 压缩率小于1才会压缩
        deleteOriginalAssets: false // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
      }),
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/", "/login"],
        renderer: new Renderer({
          inject: {
            foo: "bar"
          },
          headless: false,
          renderAfterDocumentEvent: "render-event"
        })
      })
    ],
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
