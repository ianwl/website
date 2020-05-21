module.exports = {
  // publicPath: '/frontend/',
  // publicPath: '/wl_frontend_ci_test/dist/',
  publicPath: process.env.publicPath || '',
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
  },
};
