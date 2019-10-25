var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var io = require('socket.io-client');

var app = express();
var http = require('http').createServer(app);
app.use(bodyParser.json());
app.use(cors());

var json = require('./ports.json');
var socket = io('http://localhost:' + json.masterPort);

var port = json.worker2Port;
var busy = false;
setInterval(() => {
    if (!busy) {
        socket.emit('worker', {ready: true});
    }
}, 3000);

// ############################################################

socket.on('master', data => {
    busy = true;
    console.log('worker2 received ' + data.workload + ' seconds of work');
    
    setTimeout(() => {
        socket.emit('worker', {ready: true})
        busy = false;
    });
});

var server = http.listen(port, function() {
    console.log('worker2 on port ' + port + ' sending ready message');
    socket.emit('worker', {ready: true});
});

// ############################################################