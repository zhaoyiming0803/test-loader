const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
  console.log('loader a normal: ', source)
  // return `module.exports = "this is loader a normal"`
  return source
}

// loader.pitch = function pitch (remainingRequest, previousRequest, data) {
//   console.log('loader a pitch')
//   return 'module.exports = require(' + JSON.stringify('!!' + remainingRequest) + ');';
// }

module.exports = loader