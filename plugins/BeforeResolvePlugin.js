const path = require('path')

class BeforeResolvePlugin {
  constructor (source, target, mode){
    this.source = source
    this.target = target
    this.mode = mode
  }
  
  apply (resolver) {
    const target = resolver.ensureHook(this.target)
    resolver.getHook(this.source).tapAsync('BeforeResolvePlugin', (request, resolveContext, callback) => {
      if (request.mode) {
        return callback()
      }
      const resourcePath = request.request
      const resourceExt = path.extname(resourcePath)
      const obj = Object.assign({}, request, {
        request: resourcePath.slice(0, resourcePath.length - resourceExt.length) + `.${this.mode}` + resourceExt,
        mode: this.mode
      })
      resolver.doResolve(target, obj, 'add mode: ' + this.mode, resolveContext, callback)
    })
  }
}

module.exports = BeforeResolvePlugin