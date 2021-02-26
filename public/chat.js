var name = prompt('What would you like to be called?')
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typemessages = document.getElementById('usertyping');
var bail = document.getElementById('bail');
var dced = document.getElementById('dis');
var typemessages = document.getElementById('typemessages');
var bail = document.getElementById('bail')
var main = document.getElementById('main');
var play = document.getElementById('play');

input.addEventListener('input', function() {
    socket.emit('type', name);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat', { name: name, msg: input.value});
        socket.emit('stoptype', name);
        input.value = '';
    }
});

main.addEventListener('click', function() {
    socket.emit('disconnected', name);
});

play.addEventListener('click', function() {
    alert('hey dawg');
});

bail.addEventListener('click', function() {
    socket.emit('bailed', name);
    window.open('http://www.essaytyper.com/', "_self");
});



dced.addEventListener('click', function() {
    socket.emit('disconnected', name);
    socket.disconnect();
    alert('You have now disconnected from the server, kindly exit out of this tab.')
});

socket.on('bailed', function(data) {
    var item = document.createElement('li');
    item.innerHTML = "<em><strong>" + data + '</strong> has bailed from the chat room. R.I.P. </em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('chat', function(data) {
    var item = document.createElement('li');
    item.innerHTML = "<strong style='color:dodgerBlue'>" + data.name + '</strong>: ' + data.msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('connected', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<em>' + data + '</em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('welcome', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<strong><em>' + data + '</em></strong>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('num', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<em>We now have <strong>' + data + '</strong> clients connected.</em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

});

socket.on('disconnected', function(data) {
    var item1 = document.createElement('li');
    item1.innerHTML = '<em>Client: <strong>' + data.name + '</strong> has disconnected from the server.</em>'
    var item2 = document.createElement('li');
    item2.innerHTML = '<em>We now have <strong>' + data.clients + '</strong> clients connected.</em>';
    messages.appendChild(item1);
    messages.appendChild(item2);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('type', function(data) {
    typemessages.innerHTML='<em>  ' + data + '<em>';
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('stoptype', function(data) {
    typemessages.innerHTML='  ';
    window.scrollTo(0, document.body.scrollHeight)
});

//dropdown menu
function drop() {
    document.getElementById('je').classList.toggle('show');
}


