const path = require('path')
const WatchRunWebpackPlugin = require('./plugins/WatchRunWebpackPlugin')
const ShouldEmitWebpackPlugin = require('./plugins/ShouldEmitWebpackPlugin')
const ThisCompilationWebpackPlugin = require('./plugins/ThisCompilationWebpackPlugin')
const TestWebpackPlugin = require('./plugins/TestWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
// const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin')
const webpack = require('webpack')
const data = require('./data')
const BeforeResolvePlugin = require('./plugins/BeforeResolvePlugin')

module.exports = {
  target: 'web', // 默认
  devtool: 'none', // 编译后的代码不使用 eval，可直接在 node 模式下运行
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:16].js',
    // libraryTarget: 'window',
    // library: 'myLibrary' // library 的使用取决于 libraryTarget 的取值
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  // externals: {
  //   'jQuery': '$'
  // },
  resolve: {
    plugins: [new BeforeResolvePlugin('before-resolve', 'resolve', 'wx')],
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
    new AutoExternalPlugin({
      jQuery: {
        expose: '$',
        url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
      },
      vue: {
        expose: 'Vue',
        url: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js'
      }
    }),
    // new webpack.ProgressPlugin((value, ...messages) => {
		// 	data.push(messages.join("|"))
		// }),
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