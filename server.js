// Where the servers are created
// Agar.io clone
const express = require('express');
const socketio = require('socket.io');
const app = express();

// We define where to host public files
app.use(express.static(__dirname+'/public'));


const PORT = 3500;
const expressServer = app.listen( PORT,() => {
    console.log('Socket server run on port: ', PORT)
})

const io = socketio(expressServer, { cors: { origin: "*" } });

// App organization
// server.js is NOT the entry point. it create our servers
// and exports them 

module.exports = { app, io };