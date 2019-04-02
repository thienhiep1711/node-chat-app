var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
    
})

socket.on('disconnect', function() {
    console.log('Disconnect to server');
})

socket.on('newMessage', function(message) {
    console.log('New message!', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    $('#message-list').append(li);
})

socket.emit('createMessage', {
    from: "Mike",
    text: 'Hi',

}, function() {
    console.log("Got it")
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    })
})