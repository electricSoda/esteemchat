// Create connection
var socket = io.connect('http://electricSoda.github.io/esteemchat');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      chatwin = document.getElementById('chat-window');

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

// Scroll automatically when new message pops up
function scrollToBottom() {
    chatwin.scrollTop = chatwin.scrollHeight;
}

// Listen for the message
socket.on('chat', function(data) {
    shouldScroll = chatwin.scrollTop + chatwin.clientHeight === chatwin.scrollHeight;
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    message.value = ''
    if (!shouldScroll) {
        scrollToBottom();
    }
});

socket.on('connected', function(data) {
    output.innerHTML += '<p><em>' + data + '</em></p>';
});