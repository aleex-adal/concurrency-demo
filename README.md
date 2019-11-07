
# concurrency-demo
**Concurrency**  *(n)* :
The fact of two or more events or circumstances happening or existing at the same time.

**Thread**  *(n)* :
Short for a **thread** of execution. **Threads** are a way for a program to divide itself into two or more simultaneously running tasks.

**Asynchronous**  *(adj)* :
When a specific operation begins upon receipt of an indication (signal) that the preceding operation has been completed.

---

JavaScript is single-threaded, but we tell it to perform asynchronous tasks for us all the time.

```javascript
var  i = 0

fetch(url)
	.then(response  =>  response.json())

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

	-  `eventloop.js` contains asynchronous examples from [this article](https://flaviocopes.com/javascript-event-loop/)

	-  `eventloop.c` uses queues and multiple threads (multithreading) to mimick how js works

2. Use multithreading to split up a workload in C, then use multiple node servers to get the same results in JavaScript
	-  `thread.c` uses multithreading to split the workload

	-  `master.js`, `worker1.js`, and `worker2.js` split the workload among multiple node servers that can be on the same computer or distributed. The code here is simpler because distributed nodes naturally solve certain multithreading problems such as mutexes and shared data

3. Actually use multithreading in JavaScript with [Web Workers](https://medium.com/techtrument/multithreading-javascript-46156179cf9a)
	- `webworker.js` uses Web Workers to split the workload among multiple threads in the browser. This code is still simpler than C because it relies on message passing just like the websockets in the multiple-node example
  

---

**Takeaways**

- You can reduce the processing time of a large workload on a single web page or computer by using Web Workers.

- You can reduce the processing time of a large workload on a single computer or on multiple computers by using multiple nodes in NodeJS.

- JavaScript's asynchronous behavior is enabled by the browser. The browser populates its queues at various times, causing code that responds to those events to trigger at various times. The browser provides the additional threads (Web Workers).