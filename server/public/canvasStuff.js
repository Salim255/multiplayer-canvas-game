
player.locX = Math.floor(500  * Math.random() + 10 );
player.locY = Math.floor(500  * Math.random() + 10 );


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
    
    // Reset the context translate back to default
    // Its override the current transformation
    context.setTransform(1,0,0, 1,0,0);

    // What clear does is it goes to the context and
    // says, hey, start at the very top left by which is 0, 0
    // and draw a rectangle to the bottom par of the canvas, and clear everything out
    // This called every time the draw called.
    // Clears out the canvas, so we can draw on a clean canvas next frame
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Clamp the screen/vp to the player location (x, y)
    const camX = -player.locX + canvas.width/2 ;
    const camY = -player.locY + canvas.height/2 ;
    // Translate move the canvas/context to where the player is at
    context.translate(camX, camY)


    //=========== In this section we draw all the players=========
    players.forEach(p => {
        // This telling the context that,I am ready to draw
        context.beginPath();

        // This going to tell the context that , whatever we are about to draw
        context.fillStyle = p.playerData.color;
    
        // Context.arc, give us the ability to draw an arc
        // it's makes a circle
        context.arc(p.playerData.locX, p.playerData.locY, p.playerData.radius ,0 , Math.PI*2); // Draw arc/circle
        // arg1, arg2, are center x and y of the arc
        // arg3 is the radius of the circle
        // arg4, is where to start drawing in radians - 0 = 3:00
        // arg5 is where to stop the drawing in radians - Pi = 90deg
    
        // This fill the circle, with the given color
        context.fill(); 
        context.lineWidth = 3; // How wide to draw a line in pixels
        context.strokeStyle = 'rgb(0, 255, 0)'; // Draw a green line
        context.stroke(); // This actually draw the line (the border)
    })

  

    // ========= Draw all the orbs ========
    orbs.forEach(orb => {
        //console.log(orb, "hello from ")
        // This will start a new path
        // Will tell canvas we are about to draw something new
        // And so pick your pencil up and move it to the new location
        context.beginPath(); 
        context.fillStyle = orb.color;
        // Draw it
        context.arc(orb.locX, orb.locY, orb.radius , 0 , Math.PI*2);
        // Fill it in
        context.fill()
    });

    // requestAnimationFrame is like a controlled loop
    // Its going to run till we stop it
    // Its run recursively, every paint/frame. If the framerate is 35 fps
    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove',(event)=>{
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
        // Mouse is in the lower right quadrant
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
        // Mouse is in the lower left quadrant
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
        // Mouse is in the top left quadrant
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
        // Mouse is in the top right quadrant
    }

    // To make the player look faster
    speed = 10;
    xV = xVector;
    yV = yVector;

    // Here we check the player location is, if it's below five
    // in the case of the vector is going left,
    // or if it's above 500 X , then the vector up,
    // that means the player is trying to go off the grid
    // in that case we only move the player in the y axis.
    // You cant leave the x axis or you run off the map
    if((player.locX < 5 && xV < 0) || (player.locX > 500) && (xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }    
})
// The canvas is how javascript draw the stuffs