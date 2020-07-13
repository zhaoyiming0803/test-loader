const a = require('./a')
console.log('a: ', a)

import('./b').then(res => {
  console.log('b: ', res)
})