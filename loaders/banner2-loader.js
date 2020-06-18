const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
//  console.log('banner2-loader: ', source)
 const ret = 'banner2---' + Date.now()
 // console.log('issuer: ', this._module.issuer)
//  console.log('abc: ', this._module.abc)
 this.emitFile('haha/hehe/go/hello/banner-file.banner', ret)
 this.emitFile('haha/hehe/go/hello/banner-file.haha', ret + '123')
}

module.exports = loader