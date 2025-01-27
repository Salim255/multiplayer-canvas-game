// Where all our socketStuff will go
const io = require('../../server').io;
// oh... we need express, get app, but only put what we need to inside 
// of our socket stuff
const app  = require('../../server').app;

// ============= CLASSES ========
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Orb =  require('./classes/Orb');
// =============END===================

// Make an orbs array that will host all 500/5000 NOT PLAYER orbs
// Every time one is absorb, the server will make a new one
const orbs = [];
const settings = {
    defaultNumberOfOrbs: 500, // The number of orbs on the map
    defaultSpeed: 6, // Player speed, how fast they go
    defaultSize: 6, // Default player size
    defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out
    worldWidth: 500,
    worldHeight: 500,
    defaultGenericOrbSize: 5, // Smaller than player orbs
}

// On server start, to make our initial defaultNumberOfOrbs
initGame();


// This run every time, someone join the main namespace
io.on('connect', (socket) => {
    // A player has connected
    // The event that runs on join that does init game stuff

    // 1)Make the playerConfig object -
    // the data specific to this player, that only the player needs to know
    const playerConfig = new PlayerConfig(settings);
    // 2) Make the playerData object - 
    // the data specific to this player that everyone needs to know
    const playerData = new PlayerData(playerName, settings);
    // 3) Master player object - to house both,
    // for the server to be able to truck the player
    const playerName = new Player(socket.id,  PlayerConfig, PlayerData)
    socket.emit('init',  { 
       
        orbs
     });
})
function initGame(){
    // Loop defaultNumberOfOrbs times, and push a new orb to our array
    for ( let i = 0; i < settings.defaultNumberOfOrbs; i++ ) {
        const newOrb = new Orb(settings)
        orbs.push(newOrb);
    }
}