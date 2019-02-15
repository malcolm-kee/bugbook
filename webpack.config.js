const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfig = env =>
  require(`./build-config/webpack.${env.mode}.config.js`)(env);

const outputPath = path.resolve(__dirname, 'build');

/**
 * @returns {webpack.Configuration}
 */
module.exports = ({ mode } = { mode: 'production' }) => {
  return webpackMerge(
    {
      mode,
      entry: {
        app: path.resolve(__dirname, 'src', 'index')
      },
      output: {
        path: outputPath,
        publicPath: '/'
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
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          template: 'public/index.html'
        }),
        new CopyWebpackPlugin([
          { from: 'public', ignore: 'index.html', to: outputPath }
        ])
      ]
    },
    modeConfig({ mode })
  );
};
