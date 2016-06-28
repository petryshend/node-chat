var socket = io();

$(document).ready(function() {
    $('form').submit(function() {
        var newMessageInput = $('#new-message');
        socket.emit('chat message', newMessageInput.val());
        newMessageInput.val('');
        return false;
    });

   socket.on('chat message', function(data) {
        $('#messages').append($('<li>').text(data));
    });
})