var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
    
})

socket.on('disconnect', function() {
    console.log('Disconnect to server');
})

socket.on('newMessage', function(message) {
    console.log('New message!', message);
})

socket.emit('createMessage', {
    from: "Mike",
    text: 'Hi',

}, function() {
    console.log("Got it")
})