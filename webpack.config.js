const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, 'build');

/**
 * This webpack configuration is intentionally unoptimized so it's easier to debug for beginner
 * Please do NOT do this in your production site
 * @type {webpack.Configuration}
 */
module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index')
  },
  output: {
    path: outputPath,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, { verbose: true }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'public', ignore: 'index.html', to: outputPath }
    ])
  ]
};
