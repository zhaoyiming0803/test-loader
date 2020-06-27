const { compilation } = require("webpack");
const { parse } = require("commander");
const ConcatSource = require('webpack-sources').ConcatSource

class TestWebpackPlugin {
  constructor () {}

  apply (compiler) {
    let author

    compiler.hooks.thisCompilation.tap('TestWebpackPlugin', (compilation, compilationParams) => {
      // console.log(Object.keys(compiler.hooks))
      // 每种 compiler.hooks 下的 compilation 是不一样的
      // console.log(Object.keys(compilation.hooks))

      // compilation.errors.push('error0', 'error1')
      // compilation.warnings.push('warning0', 'warning1')

      if (!compilation.__author__) {
        author = compilation.__author__ = {
          name: 'zhaoyiming',
          age: 18,
          sex: 'man'
        }
      }

      // Called when all modules have been built without errors.
      compilation.hooks.finishModules.tap('TestWebpackPlugin', modules => {
        
      })

      compilation.hooks.optimizeModules.tap('TestWebpackPlugin', modules => {
        // console.log('modules: ', modules[1])
      })

      compilation.hooks.optimizeChunkAssets.tapAsync('TestWebpackPlugin', (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            compilation.assets[file] = new ConcatSource(
              '\/** created by zhaoyiming at 2020/06/27 **\/',
              '\n',
              compilation.assets[file]
            )
          })
        })
        callback()
      })

      compilation.hooks.additionalAssets.tapAsync('TestWebpackPlugin', callback => {
        const source = new ConcatSource()
        source.add('create at ' + Date.now())
        compilation.assets['webpack-version.txt'] = source
        callback()
      })

      const {normalModuleFactory} = compilationParams

      normalModuleFactory.hooks.parser.for('javascript/auto').tap('TestWebpackPlugin', (parser) => {
        // console.log('parser')

        parser.hooks.evaluateTypeof.for('myIdentifier').tap('TestWebpackPlugin', expression => {
          // console.log('evaluateTypeof')
          return 2 === 1
        })

        parser.hooks.rename.for('d').tap('TestWebpackPlugin', expression => {
          // console.log('--- rename ---')
          return 2 === 1
        })

        parser.hooks.assigned.for('h').tap('TestWebpackPlugin', expression => {
          // console.log('assigned')
        })

        parser.hooks.call.for('require').tap('TestWebpackPlugin', expression => {
          // console.log('call: ', expression)
          expression.loc.range = expression.range
        })

        parser.hooks.evaluate.for('CallExpression').tap('TestWebpackPlugin', expression => {
          // console.log('--- evaluate: ', expression)
          // console.log('parser.state.module.resource: ', parser.state.module.resource)
          if (/test-loader/.test(parser.state.module.resource)) {
            const current = parser.state.current
            // console.log('current: ', current)
          }
        })
      })
    })

    compiler.hooks.compilation.tap('TestWebpackPlugin', (compilation, compilationParams) => {
      
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