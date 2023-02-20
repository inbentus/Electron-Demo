module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // chainWebpackMainProcess: config => {
      //   config.module
      //     .rule('babel')
      //     .test(/background\.js$/)
      //     .use('babel')
      //     .loader('babel-loader')
      //     .options({
      //       presets: [['@babel/preset-env', { modules: false }]],
      //       plugins: ['@babel/plugin-proposal-class-properties']
      //     })
      // }
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};
