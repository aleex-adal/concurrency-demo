var id = null;

self.addEventListener('message', async function(e) {
    if (e.data.begin) {
        var arr = await workerLoadData();
        self.postMessage({
            done: true,
            arr: arr
        })
    }
}, false);

async function workerLoadData() {
    let response = await fetch('http://localhost:8000/reddit_data.json');
    let data = await response.json();

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
    return arr;
};

function compare(a, b) {
    return a[1] - b[1];
}