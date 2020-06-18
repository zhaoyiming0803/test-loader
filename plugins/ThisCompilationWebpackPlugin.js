class ThisCompilationWebpackPlugin {
  constructor (){}

  apply (compiler) {
    compiler.hooks.thisCompilation.tap('ThisCompilationWebpackPlugin', (compilation, params) => {
      console.log('compilation: ', compilation)
      console.log('params: ', params)
    })
  }
}

module.exports = ThisCompilationWebpackPlugin