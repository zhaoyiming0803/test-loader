const ExternalModule = require('webpack/lib/ExternalModule')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class AutoExternalPlugin {
  constructor (options) {
    this.options = options
    this.externalModules = {}
  }

  apply (compiler) {
    // Called after a NormalModuleFactory is created.
    // 1、在解析语法树的过程中查找那些需要外部引入的模块名称
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', normalModuleFactory => {
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('AutoExternalPlugin', parser => {
        parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
          // console.log('source: ', source)
          // console.log('statement: ', statement)
          if (this.options[source]) {
            this.externalModules[source] = true
          }
        })
      })
      // 2、在生产模块的过程中发现如果是外部模块则返回外部模块
      normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', factory => (data, callback) => {
        // console.log('dependencies: ', data.dependencies)
        const request = data.dependencies[0].request
        if (this.externalModules[request]) {
          const varName = this.options[request].expose
          callback(null, new ExternalModule(varName, 'window'))
        } else {
          factory(data, callback)
        }
      })
    })

    compiler.hooks.thisCompilation.tap('AutoExternalPlugin', compilation => {
      // 3、向 body 底部插入全局变量的脚本
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin', (data, callback) => {
        // console.log('alterAssetTags: ', data)
        Object.keys(this.externalModules).forEach(source => {
          data.assetTags.scripts.unshift({
            tagName: 'script',
            voidTag: false,
            attributes: {
              type: 'text/javascript',
              src: this.options[source].url
            }
          })
        })
        callback(null, data)
      })
    })
  }
}

module.exports = AutoExternalPlugin