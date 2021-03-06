const webpack = require('webpack');

/**
 * @returns {webpack.Configuration}
 */
module.exports = () => ({
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    historyApiFallback: {
      rewrites: [{ from: /^\/bugs/, to: '/bugs.html' }]
    }
  },
  plugins: [new webpack.ProgressPlugin()]
});
