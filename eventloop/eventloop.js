const first = () => console.log('The first function')
const second = () => console.log('The second function - execute timeout callback')
const third = () => console.log('The third function - execute async data call')
const fourth = () => console.log('The fourth function')

first()

setTimeout(second, 0) // goes onto message queue

new Promise( (resolve, reject) => resolve(third) ) // goes onto the job queue
  .then(resolve => resolve())

fourth()