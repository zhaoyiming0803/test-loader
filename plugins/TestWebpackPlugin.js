const { compilation } = require("webpack");

class TestWebpackPlugin {
  constructor () {}

  apply (compiler) {
    compiler.hooks.thisCompilation.tap('TestWebpackPlugin', compilation => {
      console.log(Object.keys(compiler.hooks))
      // 每种 compiler.hooks 下的 compilation 是不一样的
      console.log(Object.keys(compilation.hooks))
      
      compiler.hooks.thisCompilation.tap('TestWebpackPlugin', compilation => {
        console.log('thisCompilation')
      })

      compiler.hooks.compilation.tap('TestWebpackPlugin', compilation => {
        console.log('compilation')
      })

      compiler.hooks.afterCompile.tap('TestWebpackPlugin', compilation => {
        console.log('afterCompile')
      })
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