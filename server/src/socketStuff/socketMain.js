// Where all our socketStuff will go
const io = require('../../server').io;
// oh... we need express, get app, but only put what we need to inside 
// of our socket stuff
const app  = require('../../server').app;

const Orb =  require('./classes/Orb');
// Make an orbs array that will host all 500/5000 NOT PLAYER orbs
// Every time one is absorb, the server will make a new one
const orbs = [];

// On server start, to make our initial 500
initGame();


// This run every time, someone join the main namespace
io.on('connect', (socket) => {
    // The event that runs on join that does init game stuff
    socket.emit('init',  { orbs });
})
function initGame(){
    // Loop 500 times, and push a new orb to our array
    for ( let i = 0; i < 500; i++ ) {
        const newOrb = new Orb()
        orbs.push(newOrb);
    }
}