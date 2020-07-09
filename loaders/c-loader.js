const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
  console.log('loader c normal: ', source)
  // return source
  return `module.exports = "this is c loader content"`
}

// loader.pitch = function pitch (remainingRequest, previousRequest, data) {
//   console.log('loader c pitch')
// }

module.exports = loader