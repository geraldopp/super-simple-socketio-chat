const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const mong = mongoose.connect('mongodb://localhost:27017/test').then(con => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

const app = express();

app.use('/', express.static(`${__dirname}/public`));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connect', (socket) => {
    socket.on('messageToServer', (data) => {
        io.emit('messageToClient', {msg: data.msg});
    });
});