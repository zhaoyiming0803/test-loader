const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');

function loader(source) {
    // console.log('banner3-loader: ', source)
    this._module.abc = 123

    // return 'source from banner3-loader sync'

    // const callback = this.async()
    // setTimeout(() => {
    //     callback(null, 'source from banner3-loader async')
    // }, 2000)

    // this.callback(null, 'source from banner3-loader callback')
    this.callback(null, source)
}

module.exports = loader