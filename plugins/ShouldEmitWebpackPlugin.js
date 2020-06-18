const { compilation } = require("webpack");

class ShouldEmitWebpackPlugin {
  constructor () {

  }

  apply (compiler) {
    compiler.hooks.shouldEmit.tap('ShouldEmitWebpackPlugin', compilation => {
      console.log('compilation.modules: ')
      // console.log('ShouldEmitWebpackPlugin:---------', )
      // Object.keys(compilation.assets).forEach(sourceName => {
      //   console.log(compilation.assets[sourceName].node())
      // })
      // console.log(':---------ShouldEmitWebpackPlugin' )
    })
  }
}

module.exports = ShouldEmitWebpackPlugin