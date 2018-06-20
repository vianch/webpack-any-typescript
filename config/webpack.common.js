const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const environments = require('./environment.config');
const path = require('./path');

const METADATA = {
  title: "Webpack typescript",
  baseUrl: '/'
};

module.exports = {
  entry: {
    'app': path.root('src/main.ts')
  },

  resolve: {
    extensions: ['.ts', 'tsx', '.js', '.json'],
    modules: [path.root('src'), path.root('node_modules')]
  },

  output: {
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader',
          options: {
            configFile: path.root('config/tslint.json'),
            emitErrors: true,
            failOnHint: true,
          }
        }]
      },

      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.root('config/tsconfig.json'),
              transpileOnly: true
            }
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== environments.production ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
             removeComments: false,
            collapseWhitespace: false
          }
        }],
        exclude: [path.root('src/index.html')]
      },

      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },
    ]
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.root('config/tsconfig.json')
    }),

    new MiniCssExtractPlugin({
      filename: path.root('dist/assets/css/[name].css'),
      chunkFilename: "[id].css"
    }),

    new AssetsPlugin({
      path:  path.root('dist/assets/images'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),

    new CopyWebpackPlugin([
      { from:  path.root('src/assets'), to: path.root('dist/assets') },
    ]),

    new HtmlWebpackPlugin({
      template: path.root('src/index.html'),
      filename: path.root('dist/index.html'),
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'body',
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      }
    }),
  ]
};
