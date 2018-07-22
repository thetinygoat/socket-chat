const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.set('view engine', 'pug')

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
});

io.on('connection', (socket)=>{
    socket.on('chat message',(data)=>{
        io.emit('chat message', data);
    });
    socket.on('disconnect', ()=>{
        io.emit('disconnect', 'user disconnected!');
    });
    socket.on('typing', (data)=>{
        io.emit('typing', data);
    });
    socket.on('notyping', (data) => {
        io.emit('notyping', data);
    })
});

http.listen(process.env.PORT);