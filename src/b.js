import('./c').then(res => {
  console.log('c in b: ', res)
})

module.exports = 'this is b.js'