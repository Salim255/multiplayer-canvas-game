// Connect to socket server
const socket = io.connect('http://localhost:3500');

socket.on('init', (initData) => {
    orbs = initData.orbs;
})