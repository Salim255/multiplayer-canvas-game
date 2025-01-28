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
const players = []

// On server start, to make our initial defaultNumberOfOrbs
initGame();

let tickTockInterval ;

// This run every time, someone join the main namespace
io.on('connect', (socket) => {
    let player = {};
    // A player has connected
    // The event that runs on join that does init game stuff
    socket.on('init', (playerObj, ackCallBack) =>  {

        // Someone is about to be added to the players, 
        // start tick-tocking
        if (players.length === 0) { 
             // Tick-tock - issue an event to every connected socket
            // that is playing the game 30 times per second
            tickTockInterval = setInterval(() => {
                io.to('game').emit('tick', players) // Send the event to the game room
            }, 33); // 1000/30, there are 33, 30's in 1000 millisecond
            // so if we want to run something 30 time in a second, then we need to run 
            // run every 33 millisecond
        }
       

        socket.join('game'); // Add this socket to the game room
        // 1)Make the playerConfig object -
        // the data specific to this player, that only the player needs to know
        const playerConfig = new PlayerConfig(settings);
        // 2) Make the playerData object - 
        // the data specific to this player that everyone needs to know
        const playerName = playerObj.playerName;
        const playerData = new PlayerData(playerName, settings);
        // 3) Master player object - to house both,
        // for the server to be able to truck the player
        const player = new Player(socket.id ,playerConfig , playerData);
        players.push(player)
        ackCallBack(orbs); // Send the orbs array back as an ack function
    
    })

    // The client sent over a talk
    socket.on('talk', (data) => {
        // To make the player look faster
        speed = player.playerConfig.speed ;
        const xV = player.playerConfig.xVector  = data.xVector;
        const yV = player.playerConfig.yVector = data.yVector;

        // Here we check the player location is, if it's below five
        // in the case of the vector is going left,
        // or if it's above 500 X , then the vector up,
        // that means the player is trying to go off the grid
        // in that case we only move the player in the y axis.
        // You cant leave the x axis or you run off the map
        if((player.playerData.locX < 5 && xV < 0) || (player.playerData.locX > 500) && (xV > 0)){
            player.playerData.locY -= speed * yV;
        }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
            player.playerData.locX += speed * xV;
        }else{
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })
    socket.on('disconnect', () => {
        // Check to see if players is empty
        // if so, stop ticking
        if (players.length === 0) {
            clearInterval(tickTockInterval);
        }
    })
})
function initGame(){
    // Loop defaultNumberOfOrbs times, and push a new orb to our array
    for ( let i = 0; i < settings.defaultNumberOfOrbs; i++ ) {
        const newOrb = new Orb(settings)
        orbs.push(newOrb);
    }
}