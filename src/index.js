import('./a').then(res => {
  console.log('a: ', res)
})

import('./b').then(res => {
  console.log('b: ', res)
})

console.log(require('./c'))