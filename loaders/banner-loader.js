const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function bannerLoader (source) {
 const {
  target, // 编译的目标，是从webpack配置中传递过来的，默认是'web'，也可以是'node'等
  request, // 请求的资源的路径（每个资源都有一个路径）
  minimize, // 是否压缩：true/false，现在已废弃
  sourceMap, // 是否生成sourceMap: true/false
  rootContext, // 当前项目绝对路径，对本例子来说是： /Users/didi/Desktop/test-loader
  resourcePath, // 资源文件的绝对路径，对本例子来说是：/Users/didi/Desktop/test-loader/src/a.banner
  resourceQuery // 资源的 query 参数，也就是问号及后面的，如 ?a=1&b=2
 } = this
 console.log('target: ', target)
 console.log('request: ', request)
 console.log('minimize: ', minimize)
 console.log('sourceMap: ', sourceMap)
 console.log('rootContext: ', rootContext)
 console.log('resourcePath: ', resourcePath)
 console.log('resourceQuery: ', resourceQuery)

 // console.log(loaderUtils.parseQuery(this.resourceQuery))
 // console.log(this._module.rawRequest)

 const callback = this.async()

 callback(null, '/*banner*/require("!!../loaders/banner2-loader?type=json&index=1!../loaders/banner3-loader?a=1&b=2!../src/a.banner");/*js*/require("../src/a.js")')
}

module.exports = bannerLoader;