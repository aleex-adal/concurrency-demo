function loadDataWithWebWorker() {
    console.log("starting to load reddit comments");
    clearLists();

    var worker = new Worker('reddit_worker.js');
    worker.addEventListener('message', function(e) {
        if (e.data.done) {
            worker.terminate();
            var arr = e.data.arr;
            populateLists(arr); 
            // the worker does not have access to the DOM
            // can also use wasm in the worker
        }
    });

    worker.postMessage({
        begin: true,
    });
}

function loadData() {
    console.log("starting to load reddit comments");
    clearLists();
    fetch('http://localhost:8000/reddit_data.json').then(response => {
        response.json().then(json => {
            let data = json;
            console.log(data);

            let wordMap = new Map();

            data.forEach(piece => {
                console.log(piece);

                let arr = piece.body.split(' ');
                arr.forEach(word => {
                    if (!!wordMap.get(word)) {
                        wordMap.set(word, wordMap.get(word) + 1);
                    } else {
                        wordMap.set(word, 1);
                    }
                });
            });

            console.log('done!');
            var mapIter = wordMap.entries();
            var curr;
            var arr = [];
            console.log('pushing to arr');
            while (!!(curr = mapIter.next().value)) {
                arr.push(curr);
            }
            console.log('sorting arr');
            arr.sort(compare);
            console.log(arr);
            populateLists(arr);
        });
    });
};

function compare(a, b) {
    return a[1] - b[1];
}

function clearLists() {
    for (let i=0; i < 10; i++) {
        document.getElementById(i).innerHTML = '';
    }

    for (let i=99; i >= 90; i--) {
        document.getElementById(i).innerHTML = '';
    }

    document.getElementById("5").innerHTML = 'Processing...';
}

function populateLists(arr) {
    for (let i=0; i < 10; i++) {
        document.getElementById(i).innerHTML = arr[i][0] + ': ' + arr[i][1] + ' times';
    }

    let orig = 99;
    for (let i=99; i >= 90; i--) {
        let ind = arr.length -1 -(orig - i);
        document.getElementById(i).innerHTML = arr[ind][0] + ': ' + arr[ind][1] + ' times';
    }
}

var clicks = 0;
function onClick() {
    document.getElementById("onClick").innerHTML = ++clicks;
}