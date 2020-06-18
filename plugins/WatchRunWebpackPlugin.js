const { compilation } = require("webpack");

class WatchRunWebpackPlugin {
  constructor () {

  }

  apply (compiler) {
    compiler.hooks.watchRun.tapAsync('WatchRunWebpackPlugin', compilation => {
      console.log('WatchRunWebpackPlugin start')
    })
  }
}

module.exports = WatchRunWebpackPlugin