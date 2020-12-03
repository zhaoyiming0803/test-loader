"use strict"

// import "./style.css"
// import Vue from 'vue'
import $ from 'jQuery'

import myObj from './use'
const d = require('/Users/didi/Desktop/github/test-loader/src/d')
console.log('d: ', d)

const Vue = require('vue')
console.log('Vue: ', Vue)

const $$ = require('jQuery')

// import('./b').then(res => {
//   console.log('b: ', res)
// })

// import banner from './a.banner'
// console.log(banner)

// const banner = require('./a.banner')
// console.log(banner)

const toast = myObj.showToast('12345')

// console.log('process.env.customEnv: ', process.env.customEnv)
// console.log('a1b2c3: ', a1b2c3)

const hello = {
  showToast () {
    return 'this is hello.showToast'
  }
}

wx.showToast()


console.log('body element: ', $('body'))

// const literalObj = {}

import a from './deps/a'
import c from './deps/c'

console.log('a: ', a)
console.log('c: ', c)