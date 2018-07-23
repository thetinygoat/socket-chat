const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const IP = process.env.IP;
// app.set('view engine', 'pug')
app.use(express.static('public'));
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
});

io.on('connection', (socket)=>{

    io.emit('new connection', 'new user connected!');
    io.emit('active users', io.engine.clientsCount);

    socket.on('new message', (data)=>{
        io.emit('new message', data);
    });
    socket.on('disconnect', ()=>{
        io.emit('disconnect', 'a user left!');
    });

});

http.listen(PORT,IP,()=>{
    console.log('server started...');
});