// We will call this init function, when user
// click on start game
const init = () => {
    console.log('====================================');
    console.log("hello from int");
    console.log('====================================');
    draw()
}

let randomX = Math.floor(500  * Math.random() + 10 );
let randomY = Math.floor(500  * Math.random() + 10 );

// This telling the context that,I am ready to draw
context.beginPath();

// This going to tell the context that , whatever we are about to draw
// is going to be red
context.fillStyle = 'rgb(255, 0, 0)';


// Context.arc, give us the ability to draw an arc
// it's makes a circle
context.arc(randomX, randomY, 10 ,0 , Math.PI*2); // Draw arc/circle
// arg1, arg2, are center x and y of the arc
// arg3 is the radius of the circle
// arg4, is where to start drawing in radians - 0 = 3:00
// arg5 is where to stop the drawing in radians - Pi = 90deg

// This fill the circle, with the given color
context.fill(); 
context.lineWidth = 3; // How wide to draw a line in pixels
context.strokeStyle = 'rgb(0, 255, 0)'; // Draw a green line
context.stroke(); // This actually draw the line (the border)
console.log(randomX, randomY)
// ===========================
// ================DRAW=======
// ==========================
// The purpose of the this function, is going to draw the player which is a simple orb
// and then its going to clamp the window to that player
// thats means actual world is going to be much larger than what the player cn see
// But as the player moves around, rather than moving around the screen, 
// the orb will always be in the center of the screen and let the world 
// move around with him.
// We also add the mouse listeners here, so that as the mouse moves, the 
// player orb will move towards the mouse accordingly
const draw = () => {
    
}

// The canvas is how javascript draw the stuffs