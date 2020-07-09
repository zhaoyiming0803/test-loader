const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
  console.log('loader b normal')
  return source
}

loader.pitch = function pitch (remainingRequest, previousRequest, data) {
  console.log('loader b pitch')
  // 经过 remainingRequest 也就是 c-loader 的处理
  // 再经过 babel-loader 的处理，在 babel-loader 源码中打 console 可以看到 babel-loader source: xxxxx
  return 'module.exports = require(' + JSON.stringify('!!babel-loader!' + remainingRequest) + ');';
}

module.exports = loader