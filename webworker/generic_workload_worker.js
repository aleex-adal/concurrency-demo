var id = null;

self.addEventListener('message', function(e) {
    if (e.data.id !== undefined) {
        id = e.data.id;
    }
    console.log('worker ' + id + ' received ' + e.data.workload + ' seconds of work');
    this.setTimeout(() => {
        self.postMessage({
            msg: 'ready!'
        })
    }, e.data.workload * 1000);
}, false);