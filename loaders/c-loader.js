const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');
const async = require('async')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')

const entryDeps = new Set()

function loader(source) {
  console.log('loader c normal: ', source)
  // return source
  // return `module.exports = "this is c loader content"`

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
    }
  ], () => {
    // callback(null, `module.exports = "this is c loader content!!!"`)
    callback(null, source)
  })
}

// loader.pitch = function pitch (remainingRequest, previousRequest, data) {
//   console.log('loader c pitch')
// }

module.exports = loader