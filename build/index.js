const webpack = require('webpack')
const baseWebpackConfig = require('../webpack.config')
const merge = require('webpack-merge')
const {program} = require('commander')

// 获取命令行中的参数，如 --watch --mock 等
const originalArgv = JSON.parse(process.env.npm_config_argv)
  .original
  .filter(item => item.indexOf('--') === 0)
  .map(item => item.slice(2))

// console.log(originalArgv)

const compiler = webpack(merge({}, baseWebpackConfig))

// compiler.watch({
//   ignored: /node_modules/,
//   aggregateTimeout: 1000
// }, function () {
//   console.log('watch~')
// })

compiler.run(function (err, stats) {
  if (!err) {
    console.log('stats: ', stats)
  } else {
    console.log('err: ', err)
  }
})
