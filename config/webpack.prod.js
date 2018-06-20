const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const environments = require('./environment.config');
const path = require('./path');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    output: {
        path: path.root('dist/assets/js'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true,
        concatenateModules: true,
        minimize: true,
    },

    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(environments.production) }),
    ]
});
