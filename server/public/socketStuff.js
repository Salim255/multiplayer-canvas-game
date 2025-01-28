// Connect to socket server
// Connect to the main namespace
const socket = io.connect('http://localhost:3500');

// We will call this init function, when user
// click on start game
const init = async () => {
    const initData = await socket.emitWithAck('init',  {
        // Player comes from uiStuff.js
        playerName: player.name
    })

    // Our await has resolved, so start talking
    setInterval(() => {
        socket.emit('tock', {
            xVector: player.xVector ? player.xVector : .1 ,
            yVector: player.yVector ? player.yVector : .1 
        })
    },33);

    orbs = initData.orbs;
    player.indexInPlayers = initData.indexInPlayers;
    // Init is called inside of start-game handler
    draw(); // Draw function is inside canvasStuff.js
}

// The server sends out the locationall/data of all  players 
socket.on('tick', (playersArray ) => {
    players = playersArray; // The players coming form uiStuff
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
})


socket.on('orbSwitch', (orbData) => {
    // The server just told us an orb was absorbed, Replaced on the orbs array
    orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb)
})

socket.on('playerAbsorbed', absorbData => {
    console.log('Player absorbed', absorbData.absorbed )
})