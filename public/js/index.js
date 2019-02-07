var socket = io();
var $ = $;

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formatedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });
    $('#messages').append(html);
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },function(){
        $('[name=message]').val('');
    })
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position.coords);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }),
    function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert("Unable to fetch location");
    }
})