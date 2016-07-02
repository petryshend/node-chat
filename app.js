var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


var ChatMessage = require('./models/ChatMessage');

mongoose.connect('mongodb://localhost/node_chat', function() {
    console.log('Connected to the database');

    // DROP DATABASE FOR DEV
    mongoose.connection.db.dropDatabase(function() {
        console.log('Database dropped');
    });
});

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function(req, res) {
    ChatMessage.find(function(error, doc){
        res.render('index', {messages: doc});
    });
});

io.on('connection', function(socket){

    io.emit('user connected', 'CONNECTED USERNAME');

    socket.on('disconnect', function() {
        io.emit('user disconnected', 'DISCONNECTED USERNAME');
    });

    socket.on('chat message', function(data) {
        var newMessage = new ChatMessage({message: data}).save();
        io.emit('chat message',
            {
                message: data,
                dateTime: Date.now()
            }
        );
    })

});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});