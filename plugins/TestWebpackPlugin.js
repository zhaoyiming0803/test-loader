const { compilation } = require("webpack");

class TestWebpackPlugin {
  constructor () {}

  apply (compiler) {
    compiler.hooks.run.tap('TestWebpackPlugin', compilation => {
      console.log('run TestWebpackPlugin')
    })

    // compiler.hooks.make.tapAsync('TestWebpackPlugin', compilation => {
    //   console.log('TestWebpackPlugin make tap: ', compilation)
    // })

    // compiler.hooks.emit.tap('TestWebpackPlugin', compilation => {
      // console.log('TestWebpackPlugin emit tap: ', compilation.assets)
      // Object.keys(compilation.assets).forEach(fileName => {
      //   console.log(
      //     'compilation.assets[fileName]._value: ', 
      //     compilation.assets[fileName]._value ||
      //     compilation.assets[fileName].listMap().children[0].generatedCode
      //   )
      // })
    // })
  }
}

module.exports = TestWebpackPlugin