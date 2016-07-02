var socket = io();

$(document).ready(function() {

    $('form').submit(function() {
        var newMessageInput = $('#new-message');
        socket.emit('chat message', newMessageInput.val());
        newMessageInput.val('');
        return false;
    });

    var $messages = $('#messages');

    socket.on('chat message', function(data) {
        var $messageLi = $('<li>').text(data.message);
        var $dateTimeSpan = $('<span class="pull-right">').text(new Date(data.dateTime));
        $messageLi.append($dateTimeSpan);
        $messages.append($messageLi);
        $('ul').scrollTop(9999); // TODO: find better solution
    });

    socket.on('user connected', function(data) {
        $messages.append($('<li>', {'class': 'user-connected-li'}).text('New user connected: ' + data));
    });

    socket.on('user disconnected', function(data) {
        $messages.append($('<li>', {'class': 'user-disconnected-li'}).text('User disconnected: ' + data));
    });
})