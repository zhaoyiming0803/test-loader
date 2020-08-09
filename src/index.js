"use strict"
import myObj from './use'
const d = require('./d')
console.log('d: ', d)

// import('./b').then(res => {
//   console.log('b: ', res)
// })

// import banner from './a.banner'
// console.log(banner)

const banner = require('./a.banner')
console.log(banner)

const toast = myObj.showToast('123')

console.log('process.env.customEnv: ', process.env.customEnv)
console.log('a1b2c3: ', a1b2c3)

const $ = require('jQuery')
console.log('body element: ', $('body'))

const literalObj = {}