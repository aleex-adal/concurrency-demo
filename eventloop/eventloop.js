const second = () => console.log('The second function - execute timeout callback')
const fourth = () => console.log('The fourth function')

// learning objectives: explain what concurrency is in JS, use concurrency model to...
// diagram, what is this showing about javascript? diagram about how functions go onto the queue
// diagram about how other languages do it differently. Images about how it works in C or java

// ingest a bunch of (1mb) csv data, show how vanilla JS blocks,
// use webworkers to send data to the background and render
// something on the UI.

// do expensive stuff but NOT rendering - computationally expensive. When it's done, console log or show sum of something
// find the top 10 most common words on reddit comments

// web workers code challenge/additional task to do with web workers for a free cookie (ask danny)

// first function, second etc
console.log('The first function')

setTimeout(second, 0) // click

new Promise((resolve, reject) =>
  resolve('The third function - execute async data call')
).then(resolve => console.log(resolve))

fourth()
