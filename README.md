# concurrency-demo
**Concurrency** *(n)* :
The fact of two or more events or circumstances happening or existing at the same time.

**Thread** *(n)* :
Short for a **thread** of execution. **Threads** are a way for a program to divide itself into two or more simultaneously running tasks.

**Asynchronous** *(adj)* :
When a specific operation begins upon receipt of an indication (signal) that the preceding operation has been completed.

---
JavaScript is single-threaded, but we tell it to perform asynchronous tasks for us all the time.
```javascript
var i = 0

fetch(url)
  .then(response => response.json())
  
i++

document.addEventListener('click', function (event) {
	console.log(event.target);
}, false)

i++
```
When we reach the bottom of this code block, i = 3 always. However, the fetch and event listener may or may not have executed by this point.

---
Sometimes, we have large workloads that are not event-driven. For example, downloading a large amount of data such as analytics, user data, images, or anything similar. 

If we must process this data in any way, it would be useful to split up these large workloads and tell the computer to do multiple tasks at once. **The goal of this lunch-and-learn is to explore multithreading and give you some ways to play with concurrency in JavaScript.**

1. Illustrate how JavaScript works asynchronously and use multithreading to mimic the behavior
	- `eventloop.js` contains asynchronous examples from [this article](https://flaviocopes.com/javascript-event-loop/)
	- `eventloop.c` uses queues and multiple threads (multithreading) to mimick how js works

2. Use multithreading to split up a workload in C, then use multiple node servers to get the same results in JavaScript

3. Actually use multithreading in JavaScript with Web Workers

---
**Takeaways**
- JavaScript's asynchronous behavior is enabled because the browser populates its queues at various times, causing code that responds to those events to trigger at various times
- 2 nodes can perform twice the amount of work that a single node can without multithreading
- JavaScript can be multithreaded because the browser provides the additional threads (Web Workers)