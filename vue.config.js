'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const publicPath = process.env.VUE_APP_PUBLIC_PATH ||  '' // dev port
console.log(publicPath)
module.exports = {
  publicPath: publicPath,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
        .use('babel-loader')
        .loader('babel-loader')
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader');
  }
};
