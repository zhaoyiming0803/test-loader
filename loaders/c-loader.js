const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');
const async = require('async')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')

const entryDeps = new Set()

function loader(source) {
  // console.log('loader c normal: ', source)
  // return source
  // return `module.exports = "this is c loader content"`

  const mainCompilation = this._compilation
  const outputOptions = {
    filename: '__child-[name]',
    publicPath: mainCompilation.outputOptions.publicPath
  }
  const compilerName = this.resource

  const childCompiler = mainCompilation.createChildCompiler('CLoaderCompiler', outputOptions, [
    new SingleEntryPlugin(mainCompilation.compiler.context, './src/extract-file.js', 'a/b/extract-file.js')
  ])
  childCompiler.context = mainCompilation.compiler.context

  childCompiler.hooks.thisCompilation.tap('TestWebpackPlugin', (compilation) => {
    
  })

  childCompiler.runAsChild((err, entries, childCompilation) => {
    // console.log('assets: ', childCompilation.errors)
  })

  const callback = this.async()
  async.series([
    (callback) => {
      const name = 'class/b'
      const dep = SingleEntryPlugin.createDependency(this._compiler.context + '/src/b.banner', name)
      entryDeps.add(dep)
      this._compilation.addEntry(this._compiler.context, dep, name, (err, module) => {
        entryDeps.delete(dep)
        callback(err, module)
      })
    }, (callback) => {
      this.resolve(this.context, './a.banner', callback)
    }], (err, res) => {
      // console.log('resolved file obj: ', res)
    // callback(null, `module.exports = "this is c loader content!!!"`)
    callback(null, source)
  })
}

// loader.pitch = function pitch (remainingRequest, previousRequest, data) {
//   console.log('loader c pitch')
// }

module.exports = loader