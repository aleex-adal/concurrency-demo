const b = () => console.log('execute timeout callback')
const c = () => console.log('Cc')

console.log('Aa')

setTimeout(b, 0)

new Promise((resolve, reject) =>
  resolve('execute async data call')
).then(resolve => console.log(resolve))

c()
