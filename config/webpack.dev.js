const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const environments = require('./environment.config');
const path = require('./path');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'eval',

  output: {
    path: path.root('dist/assets/js'),
    publicPath: '/assets/js',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    library: 'registerList',
    libraryTarget: 'var'
  },

  optimization: {
    concatenateModules: true,
    minimize: false,
  },

  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(environments.development) }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[name].bundle.map',
      exclude: ['vendor.js']
    })
  ]
});
