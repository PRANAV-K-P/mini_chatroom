const  path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    //welcome current user
    socket.emit('message', 'Welcome to M chat');
    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat.');
    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.');
    })


})

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));