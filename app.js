var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    io.emit('user connected', 'CONNECTED USERNAME');

    socket.on('disconnect', function() {
        io.emit('user disconnected', 'DISCONNECTED USERNAME');
    });

    socket.on('chat message', function(data) {
        io.emit('chat message', data);
    })

});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});