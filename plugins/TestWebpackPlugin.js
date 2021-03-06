const { compilation } = require("webpack")
const { parse } = require("commander")
const ConcatSource = require('webpack-sources').ConcatSource
// const BeforeResolvePlugin = require('./BeforeResolvePlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const InjectDependency = require('../dependencies/InjectDependency')
const ReplaceDependency = require('../dependencies/ReplaceDependency')
const ConstDependency = require('webpack/lib/dependencies/ConstDependency')

class TestWebpackPlugin {
  constructor () {}

  apply (compiler) {
    // const beforeResolvePlugin = new BeforeResolvePlugin('before-resolve', 'resolve', 'wx')

    // if (Array.isArray(compiler.options.resolve.plugins)) {
    //   compiler.options.resolve.plugins.push(beforeResolvePlugin)
    // } else {
    //   compiler.options.resolve.plugins = [beforeResolvePlugin]
    // }

    new DefinePlugin({
      'process.env.customEnv': JSON.stringify('this is customEnv!!!'),
      'a1b2c3': JSON.stringify('c3b2a1')
    }).apply(compiler)

    // environment 和 afterEnvironment 在初始化完用户自定义的 plugins 后依次触发
    compiler.hooks.environment.tap('TestWebpackPlugin', () => {
      // console.log('environment')
    })

    compiler.hooks.afterEnvironment.tap('TestWebpackPlugin', () => {
      // console.log('afterEnvironment')
    })

    // entryOption 在 entry 配置项处理（内置的EntryOptionPlugin）过之后触发
    compiler.hooks.entryOption.tap('TestWebpackPlugin', (context, entry) => {
      // console.log('context: ', context)
      // console.log('entry: ', entry)
    })

    // afterPlugins 在用户自定义和内部插件都初始化完之后触发
    compiler.hooks.afterPlugins.tap('TestWebpackPlugin', $compiler => {
      // true
      // console.log(compiler === $compiler)
    })

    // afterResolvers 在 options 配置项处理完之后触发
    compiler.hooks.afterResolvers.tap('TestWebpackPlugin', $compiler => {
      // true
      // console.log(compiler === $compiler)
    })

    // beforeRun 和 run 在实例化完 compiler 之后，执行 run 函数的时候依次触发
    compiler.hooks.beforeRun.tapAsync('TestWebpackPlugin', ($compiler, callback) => {
      // true
      // console.log(compiler === $compiler)
      callback()
    })

    compiler.hooks.run.tapAsync('TestWebpackPlugin', ($compiler, callback) => {
      // true
      // console.log(compiler === $compiler)
      callback()
    })

    // 在 normalModuleFactory 和 contextModuleFactory 钩子执行的过程中创建了 normalModuleFactory 和 contextModuleFactory 对象
    // 这两钩子的回调参数与 beforeCompile 、 compile 、thisCompilation 、compilation 钩子回调中的对应的对象是相同的
    compiler.hooks.normalModuleFactory.tap('TestWebpackPlugin', normalModuleFactory => {
      // console.log('compiler.hooks.normalModuleFactory: ')
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('TestWebpackPlugin', (parser, options) => {
        // parser.hooks.new.for('MyClass').tap('MyPlugin', expression => {
        //   console.log('new class: ', expression)
        // })
      })
    })

    compiler.hooks.contextModuleFactory.tap('TestWebpackPlugin', contextModuleFactory => {
      // console.log('compiler.hooks.contextModuleFactory: ', contextModuleFactory)
    })

    compiler.resolverFactory.hooks.resolver.for('resolver').tap('TestWebpackPlugin', resolver => {
      console.log('resolver: ', resolver)
      // resolver.hooks.resolve.tapAsync('MyPlugin', params => {
      //   console.log('params: ', params)
      // });
    });

    // beforeCompile 和 compile 在钩子 run 执行之后依次触发
    // 这两个钩子主要提供了 normalModuleFactory 、 contextModuleFactory 、compilationDependencies
    compiler.hooks.beforeCompile.tapAsync('TestWebpackPlugin', ({normalModuleFactory, contextModuleFactory, compilationDependencies}, cb) => {
      // console.log('normalModuleFactory: ', normalModuleFactory)
      // console.log('contextModuleFactory: ', contextModuleFactory)
      // console.log('compilationDependencies: ', compilationDependencies)

      cb()
    })

    compiler.hooks.compile.tap('TestWebpackPlugin', ({normalModuleFactory, contextModuleFactory, compilationDependencies}) => {
      
    })

    // beforeCompile 和 compile 之后，创建 compilation，并且依次触发钩子 thisCompilation 和 compilation
    // 有了 compilation 之后，就可以注册 compilation 上的钩子了
    let author

    compiler.hooks.thisCompilation.tap('TestWebpackPlugin', (compilation, {normalModuleFactory, contextModuleFactory, compilationDependencies}) => {
      // console.log('compilation modules in thisCompilation', compilation.modules.length) // 0 
      // console.log(Object.keys(compiler.hooks))
      // 每种 compiler.hooks 下的 compilation 是不一样的
      // console.log(Object.keys(compilation.hooks))

      // compilation.errors.push('error0', 'error1')
      // compilation.warnings.push('warning0', 'warning1')

      compilation.dependencyTemplates.set(InjectDependency, new InjectDependency.Template())
      compilation.dependencyTemplates.set(ReplaceDependency, new ReplaceDependency.Template())

      if (!compilation.__author__) {
        author = compilation.__author__ = {
          name: 'zhaoyiming',
          age: 18,
          sex: 'man'
        }
      }

      normalModuleFactory.hooks.parser.for('javascript/auto').tap('TestWebpackPlugin', (parser, parserOptions) => {
        // console.log('parserOptions: ', parserOptions)

        parser.hooks.evaluateTypeof.for('myIdentifier').tap('TestWebpackPlugin', expression => {
          // console.log('evaluateTypeof')
          return 2 === 1
        })

        parser.hooks.rename.for('e').tap('TestWebpackPlugin', expression => {
          console.log('--- rename ---')
          return 2 === 2
        })

        parser.hooks.assigned.for('h').tap('TestWebpackPlugin', expression => {
          // console.log('assigned')
        })

        parser.hooks.call.for('require').tap('TestWebpackPlugin', expression => {
          // console.log('call: ', expression)
          // expression.loc.range = expression.range
        })

        parser.hooks.evaluate.for('CallExpression').tap('TestWebpackPlugin', expression => {
          // console.log('--- evaluate: ', expression.callee.name)
          // console.log('parser.state.module.resource: ', parser.state.module.resource)
          if (/test-loader/.test(parser.state.module.resource)) {
            const current = parser.state.current
            // console.log('current: ', current)
          }
        })

        // parser.hooks.evaluateCallExpressionMember.for('showToast').tap('TestWebpackPlugin', expression => {
        //   console.log('evaluateCallExpressionMember: ', expression)
        // })

        parser.hooks.callAnyMember.for('imported var').tap('TestWebpackPlugin', expression => {
          // console.log('callAnyMember imported var: ', expression)
          const args = expression.arguments
          const name = expression.callee.object.name
          if (name !== 'myObj') {
            return
          }
          const str = 'hello Dependency template'
          const dep = new InjectDependency({
            content: args.length
              ? `, ${JSON.stringify(str)}`
              : JSON.stringify(str),
            index: expression.end - 1
          })
          parser.state.current.addDependency(dep)
        })

        parser.hooks.expression.for('wx').tap('TestWebpackPlugin', expression => {
          // console.log(expression)
          
          let _expression
          if (expression.type === 'Identifier') {
            _expression = expression
          } else if (expression.type === 'MemberExpression') {
            _expression = expression.object
          }
          const dep = new ReplaceDependency('hello', _expression.range)
          parser.state.current.addDependency(dep)
        })

        parser.hooks.expression.for('aabb').tap('TestWebpackPlugin', expression => {
          const dep = new ReplaceDependency('world', expression.range)
          parser.state.current.addDependency(dep)
        })

        // mock DefinePlugin
        parser.hooks.expression.for('abcd.efgh').tap('TestWebpackPlugin', expression => {
          const dep = new ConstDependency('"hello world"', expression.range, false)
          // dep.loc = expression.loc
          parser.state.current.addDependency(dep)
        })
      })

      normalModuleFactory.hooks.beforeResolve.tapAsync('TestWebpackPlugin', (data, callback) => {
        data.abc = 'abc'
        callback(null, data)
      })

      normalModuleFactory.hooks.afterResolve.tapAsync('TestWebpackPlugin', (data, callback) => {
        callback(null, data)
      })

      // factory 内部注册的时候，在其回调中执行 resolver 钩子，所以 factory 一般在 webpack 内部使用
      // normalModuleFactory.hooks.factory.tap('TestWebpackPlugin', () => (data, callback) => {})
    })

    compiler.hooks.compilation.tap('TestWebpackPlugin', (compilation, {normalModuleFactory, contextModuleFactory, compilationDependencies}) => {
      
    })

    // compilation 创建完之后，开始执行 make 钩子
    compiler.hooks.make.tapAsync('TestWebpackPlugin', (compilation, callback) => {
      // entry: SingleEntryDependency
      compilation.hooks.addEntry.tap('TestWebpackPlugin', (entry, name) => {
        // console.log('entry: ', entry)
        // console.log('name: ', name)
      })

      compilation.hooks.failedEntry.tap('TestWebpackPlugin', (entry, name, err) => {

      })

      compilation.hooks.succeedEntry.tap('TestWebpackPlugin', (entry, name, module) => {
        
      })

      // 下面会执行 normalModuleFactory 的一些钩子，比如 beforeResolve factory afterResovle 等
      // ......

      // 在模块构建开始之前触发，可以用来修改模块
      compilation.hooks.buildModule.tap('TestWebpackPlugin', module => {
        // console.log('buildModule: ', module)
      })

      // 模块构建失败时执行
      compilation.hooks.failedModule.tap('TestWebpackPlugin', module => {
        // console.log('module: ', module)
      })

      // 模块构建成功时执行
      compilation.hooks.succeedModule.tap('TestWebpackPlugin', module => {
        // module.variables
        // module.dependencies
        // module.blocks
        // console.log('module: ', module)
      })

      // Called when all modules have been built without errors.
      compilation.hooks.finishModules.tap('TestWebpackPlugin', modules => {
        // console.log('modules: ', modules === compilation.modules) // true
        // console.log('modules: ', modules)
        return
        modules.forEach(module => {
          console.log('module: ', module._source._name, module._source._value)
        })
      })

      compilation.hooks.optimizeModules.tap('TestWebpackPlugin', modules => {
        // console.log('modules: ', modules[0])
      })

      // compilation.hooks.afterCh1unks.tap('TestWebpackPlugin', chunks => {
      //   // console.log('chunks: ', chunks[0].entryModule._source._value)
      //   chunks.forEach(chunk => {
      //     chunk._modules.forEach(module => {
      //       return
      //       // console.log('module: ', module)
      //       if (!chunk.hasRuntime()) {
      //         console.log(123)
      //         chunk.removeModule(module)
      //       }
      //     })
      //   })
      // })

      compilation.hooks.optimizeChunkAssets.tapAsync('TestWebpackPlugin', (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            compilation.assets[file] = new ConcatSource(
              '\/** created by zhaoyiming at 2020/12/01 **\/',
              '\n',
              compilation.assets[file]
            )
          })
        })
        callback()
      })

      compilation.hooks.additionalAssets.tapAsync('TestWebpackPlugin', callback => {
        const additionalAssets = [
          {
            name: 'webpack-version.txt',
            content: 'create at ' + Date.now()
          },
          {
            name: 'class/Person.json',
            content: JSON.stringify({
              a: 100,
              b: 200
            }, null, 2)
          },
          {
            name: 'pages/index/index.wxml',
            content: `
              <view>{{a + b}}</view>
            `
          },
          {
            name: 'pages/index/index.js',
            content: `
              Page({
                data: {
                  a: 1,
                  b: 2
                },
                onLoad () {

                },
                onShow () {
                  
                }
              })
            `
          }
        ]
        additionalAssets.forEach(item => {
          const source = new ConcatSource()
          source.add(item.content)
          compilation.assets[item.name] = source
        })
        callback()
      })

      // seal 钩子中，我们可以拿到所有解析完成的 module
      compilation.hooks.seal.tap('TestWebpackPlugin', () => {
        // console.log('compilation modules in seal: ', compilation.modules)
      })

      callback()
    })

    // compilation 的 seal 钩子执行完毕之后，触发 compiler 的 afterCompile 钩子
    compiler.hooks.afterCompile.tapAsync('TestWebpackPlugin', (compilation, callback) => {
      callback()
    })

    // 在以上过程当中，如果有任何错误，会执行 failed 钩子
    compiler.hooks.failed.tap('TestWebpackPlugin', error => {
      // console.log('failed error: ', error)
    })

    // 在以上过程中，如果没有错误，会继续执行以下钩子
    compiler.hooks.shouldEmit.tap('TestWebpackPlugin', compilation => {
      return true
    })

    // 如果 shouldEmit 钩子的回调返回 false，则不再执行下面的钩子
    // 执行以下钩子的过程中，如果没有报错，都会执行 done（编译完成） 钩子

    // compiler 的 additionalPass 钩子在 compilation 的 needAdditionalPass 钩子回调返回值为 true 时执行
    compiler.hooks.additionalPass.tapAsync('TestWebpackPlugin', compilation => {

    })

    // 生成资源到 output 目录之前
    compiler.hooks.emit.tap('TestWebpackPlugin', compilation => {
      // console.log(compilation.getAssets())
      let content = '文件名 | 文件大小(K)\r\n -|-| \r\n'
      const { assets } = compilation
      const keys = Object.keys(assets)
      const filename = 'stats.md'

      keys.forEach(key => {
        const size = assets[key].size() / 1000 + 'K'
        content += `${key} | ${size} \r\n`
      })

      assets[filename] = {
        source () {
          return content
        },
        size () {
          return content.length
        }
      }

      const size = assets[filename].size() / 1000 + 'K'
      content += `${filename} | ${size} \r\n`
      return
      Object.keys(compilation.assets).forEach(fileName => {
        console.log(
          'compilation.assets[fileName]._value: ', 
          compilation.assets[fileName]._value ||
          compilation.assets[fileName].listMap().children[0].generatedCode
        )
      })
    })
    
    // 生成资源到 output 目录之后
    compiler.hooks.afterEmit.tap('TestWebpackPlugin', compilation => {
      // console.log('afterEmit')
    })

    compiler.hooks.assetEmitted.tap('TestWebpackPlugin', compilation => {
      // console.log('assetEmitted')
    })
  }
}

module.exports = TestWebpackPlugin