
var socket = io();

function scrollToBottom () {
    var message = jQuery('#message-list');
    var newMessage = message.children('li:last-child');

    var clientHight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight);
    }
}


socket.on('connect', function() {
   var params = jQuery.deparam(window.location.search);
   socket.emit('join', params, function(err) {
       if (err) {
        alert(err);
        window.location.href = '/';
       } else {
        console.log('No error');
       }
   })
})
socket.on('disconnect', function() {
    console.log('Disconnect to server');
})


socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    })
})

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });
    jQuery('#message-list').append(html);
    scrollToBottom()
})

socket.on('newLocationMessage',function(message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createAt: formattedTime,
    })
    jQuery('#message-list').append(html);
    scrollToBottom()
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    })
})

var locationButton = $('#sent-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geoloaction not support by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Sent location');
        socket.emit('createLocationMessage', {
            latitude:  position.coords.latitude,
            longtitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.');
    })
})