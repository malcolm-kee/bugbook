const webpack = require('webpack');

/**
 * @returns {webpack.Configuration}
 */
module.exports = () => ({
  output: {
    filename: '[name].[contenthash].js'
  },
  devtool: 'source-map'
});
