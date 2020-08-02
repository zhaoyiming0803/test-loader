// const d = require('./d')
// console.log('d: ', d)

// import('./b').then(res => {
//   console.log('b: ', res)
// })

// import banner from './a.banner'
// console.log(banner)

const banner = require('./a.banner')
console.log(banner)

module.exports = process.env.customEnv
