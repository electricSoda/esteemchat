// Create connection
var socket = io.connect('http://localhost:8888');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feed = document.getElementById('feedback');

// Emit Events
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})

document.querySelector("#message").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; 
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});



// Listen for the message
socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    message.value = ''
});

socket.on('connected', function(data) {
    output.innerHTML += '<p><em>' + data + '</em></p>';
});