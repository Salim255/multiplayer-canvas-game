// Connect to socket server
// Connect to the main namespace
const socket = io.connect('http://localhost:3500');

// We will call this init function, when user
// click on start game
const init = async () => {
    const initOrbs = await socket.emitWithAck('init',  {
        // Player comes from uiStuff.js
        playerName: player.name
    })

    // Our await has resolved, so start talking
    setInterval(() => {
        socket.emit('talk', {
            xVector: player.xVector,
            yVector: player.yVector
        })
    },33);

    console.log(initOrbs);
    orbs = initOrbs;
    // Init is called inside of start-game handler
    draw(); // Draw function is inside canvasStuff.js
}


socket.on('tick', (playersArray) => {
    console.log(players)
    players = playersArray; // The players coming form uiStuff
})