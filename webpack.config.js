const path = require('path')
const WatchRunWebpackPlugin = require('./plugins/WatchRunWebpackPlugin')
const ShouldEmitWebpackPlugin = require('./plugins/ShouldEmitWebpackPlugin')
const ThisCompilationWebpackPlugin = require('./plugins/ThisCompilationWebpackPlugin')
const TestWebpackPlugin = require('./plugins/TestWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
// const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin')

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
    new CleanWebpackPlugin(),
    // new VueLoaderPlugin(),
    // new AutoExternalPlugin({
    //   jquery: {
    //     expose: '$',
    //     url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
    //   },
    //   vue: {
    //     expose: 'Vue',
    //     url: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js'
    //   }
    // })
  ],
  module: {
    rules: [
      // {
      //   test: /\.banner$/,
      //   use: [{
      //     loader: 'banner-loader',
      //     options: {
      //       author: 'sdf',
      //       time: 'sdf'
      //     }
      //   }]
      // },
      {
        test: /\.banner$/,
        use: ['a-loader', 'b-loader', 'c-loader'] 
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            author: 'sdf',
            time: 'sdf'
          }
        }]
      }
    ]
  }
}