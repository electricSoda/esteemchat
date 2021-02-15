var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(9418, function(){
    console.log('listening to requests')
});

// Static Files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('client connected',socket.id);
    socket.broadcast.emit('connected', 'Someone has connected to the server.')

    socket.on('chat', function(data) {
        io.sockets.emit('chat',data);
    });
});