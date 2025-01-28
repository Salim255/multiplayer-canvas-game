// Set the width and the height of the canvas element = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
// We use this to detect if the user resize their browser

// Canvas element needs to be in a variable
const canvas = document.querySelector('#the-canvas');

// Context is how we draw! We will be drawing in 2D
const context = canvas.getContext('2d');


// This will set our canvas to the size of the the window so the 
// player has the entire screen filed up
canvas.height = wHeight;
canvas.width = wWidth;

// This will be all things "this" player
const player = {}
let orbs = []; // This is a global for all non-player orbs

// Put the modals into variables , so we can interact with them 
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

window.addEventListener('load', () => {
    // On page load, open  the login modal
    loginModal.show();
})

document.querySelector('.name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('Submitted!')
    player.name = document.querySelector('#name-input').value;
    document.querySelector('.player-name').innerHTML = player.name
    loginModal.hide();
    spawnModal.show();
})


document.querySelector('.start-game').addEventListener('click', (e) => {
    // Hide the start modal 
    spawnModal.hide()
    // Show the hiddenStart elements
    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'));
    elArray.forEach(el => el.removeAttribute('hidden') );
    init(); // Init is inside if socketStuff.js
})