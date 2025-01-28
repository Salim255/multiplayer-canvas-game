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
    if (players[player.indexInPlayers].playerData.locX) {
        player.locX = players[player.indexInPlayers].playerData.locX;
        player.locY = players[player.indexInPlayers].playerData.locY;
    }
 
})


socket.on('orbSwitch', (orbData) => {
    // The server just told us an orb was absorbed, Replaced on the orbs array
    orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb)
})

socket.on('playerAbsorbed', absorbData => {
    document.querySelector('#game-message').innerHTML = `
    ${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy} `;

    document.querySelector('#game-message').style.opacity = 1;

    window.setTimeout(() => {
        document.querySelector('#game-message').style.opacity = 0;
    }, 2000)

})

socket.on('updateLeaderBoard', leaderBoardArray => {
    leaderBoardArray.sort((a,b) =>{
        return b.score - a.score;
    })

    document.querySelector('.leader-board').innerHTML = "";
    leaderBoardArray.forEach(p => {
        if (!p.name) {
            return;
        }
        document.querySelector('.leader-board').innerHTML += `
        <li class="leaderboard-player"> ${p.name} - ${p.score}</li>`
    });
} )