var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors());

var routes = express.Router();
routes.route('/').get(function (req, res) {
    if (workload.length == 0) {
        for (var i=0; i<9; i++) {
            workload.push(Math.round(Math.random() * 5));
        }
        printWorkload();
    }
    res.status(200).json({hello: "world!"});
});

app.use('/', routes);

var json = require('./ports.json');
var port = json.masterPort;

var workload = [];
for (var i=0; i<9; i++) {
    workload.push(Math.round(Math.random() * 5));
}

// ############################################################

io.on('connection', function(socket) {
    socket.on('worker', worker => {
        if (worker.ready && workload.length > 0) {
            socket.emit('master', {workload: workload.pop()});
            printWorkload();
        }
    });
});

var server = http.listen(port, function() {
    console.log('Listening on port ' + port);
    printWorkload();
});

// ############################################################

function printWorkload() {
    var str = 'workload queue: [ '
    workload.forEach(item => {
        str = str.concat(item + ' ');
    });
    str = str.concat(']');
    console.log(str);
}