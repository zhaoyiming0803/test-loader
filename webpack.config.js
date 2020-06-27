const path = require('path')
const WatchRunWebpackPlugin = require('./plugins/WatchRunWebpackPlugin')
const ShouldEmitWebpackPlugin = require('./plugins/ShouldEmitWebpackPlugin')
const ThisCompilationWebpackPlugin = require('./plugins/ThisCompilationWebpackPlugin')
const TestWebpackPlugin = require('./plugins/TestWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/my'),
    filename: '[name].[hash:8].js'
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  recordsPath: path.join(__dirname, "records.json"),
  plugins: [
    // new WatchRunWebpackPlugin(),
    // new ShouldEmitWebpackPlugin(),
    // new ThisCompilationWebpackPlugin(),
    new TestWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.banner$/,
        use: [{
          loader: 'banner-loader',
          options: {
            author: 'sdf',
            time: 'sdf'
          }
        }]
      },
    ]
  }
}