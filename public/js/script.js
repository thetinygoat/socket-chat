// $(function () {
//     let socket = io();
// });

window.onload = function(){
    let socket = io();
    socket.on('new connection', (data)=>{
        ul = this.document.querySelectorAll('ul');
        ul[1].innerHTML += "<li class=\"card title is-6\" style=\"width:24vw; text-align:center\">" + data + "</li>";
    });
    socket.on('disconnect', (data) => {
        ul = this.document.querySelectorAll('ul');
        ul[1].innerHTML += "<li class=\"card title is-6\" style=\"width:24vw; text-align:center\">" + data + "</li>";
    });
    socket.on('active users', (data) => {
        this.document.querySelector('#active-users').innerHTML = "<li class=\"navbar-item title is-5\" style=\"color: #fff;\"> Active Users : " + data + "</li>";
    });

    document.querySelector("#sendButton").addEventListener("click", function (event) {
        event.preventDefault();
        socket.emit('new message', document.querySelector('#message-field').value);
        document.querySelector('#message-field').value = '';
        window.scrollBy(0, 2000);
    });

    socket.on('new message', (data) => {
        this.document.querySelector('#messages').innerHTML += "<li class=\"card\" style=\"\">" + data + "</li>";
    });


}