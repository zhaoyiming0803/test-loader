console.log('a.js hahahehe')

import('./b').then(res => {
  console.log('b: ', res)
})

module.exports = '1234567890'