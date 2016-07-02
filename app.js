var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


var ChatMessage = require('./models/ChatMessage');

mongoose.connect('mongodb://localhost/node_chat', function() {
    console.log('Connected to the database');

    // I don't know why to do so...
    mongoose.connection.db.dropDatabase(function() {
        console.log('Database dropped');
        new ChatMessage({message: 'This is test message'}).save();
    });
});


app.use(express.static('public'));

app.get('/', function(req, res) {
    ChatMessage.find(function(error, doc){
        message = doc[0].message;
        console.log(message);
        res.sendFile(__dirname + '/index.html');
    });
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