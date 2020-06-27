const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
//  console.log('banner2-loader: ', source)
  const ret = source + Date.now()
 // console.log('issuer: ', this._module.issuer)
//  console.log('abc: ', this._module.abc)

  const fileName = loaderUtils.interpolateName(this, '[hash].[ext]', {content: ret});
  this.emitFile(fileName, ret)

  return `module.exports = "${ret}"`;
}

module.exports = loader