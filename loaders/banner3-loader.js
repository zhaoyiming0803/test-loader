const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
    // console.log('banner3-loader: ', source)
    this._module.abc = 123
    return 'source from banner3'
}

// loader.raw = true
module.exports = loader