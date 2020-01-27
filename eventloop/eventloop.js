const first = () => console.log('The first function')
const second = () => console.log('The second function - execute timeout callback')
const third = () => console.log('The third function')

first()

setTimeout(second, 0) // goes onto message queue

third()