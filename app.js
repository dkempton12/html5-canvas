
// Grab the canvas element
const canvas = document.querySelector('#draw');

// Need the context - which is what you draw on in the window
const ctx = canvas.getContext('2d');

// Set the width for the canvas, which equals width of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
ctx.strokeStyle = '#BADA55';

// How the line drawn on the canvas will appear (rounded)
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 25;

let isDrawing = false; // initially false, but when you click down it is true, you are drawing

// X and Y coordinates for the lines
let lastX = 0;
let lastY = 0;
let direction = true; // line is going to be building up
// color
let hue = 0;

// Draw
function draw(e) {
    if (!isDrawing) return; // stop f from running when they are not moused down
    console.log(e); // logging the window coordinates

    // remember ctx is where we do all of the drawing
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // start from
    ctx.beginPath();
    // move to
    ctx.moveTo(lastX, lastY);
    // offsetX and offsetY come from the click down event
    // go to wherever the user's mouse is moving to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // lastX = e.offsetX;
    // lastY = e.offsetY;
    // In ES6, this condenses to:
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // Increments the hue each time user moves mouse while drawing a line
    // And each new line starts at the color user left off at on the previous line
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    /* width is going up to 100, and then going back down -- in other words flipping back
     and forth */
    // if greater than 100, flip direction, and less than 1, increase it
    if (ctx.lineWidth >= 25 || ctx.lineWidth <= 1) {
        direction = !direction; // flipping the direction of the line to make its width thin again
    }
    // depending on what the direction is, it either increases or decreases:
    if (direction) {
        ctx.lineWidth++
    } else {
        ctx.lineWidth--;
    }
}

// listen to mouse move event on canvas
// When user moves their mouse around the canvas, it will run the draw function
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false); // when user lets go of mouse
canvas.addEventListener('mouseout', () => isDrawing = false); // for when user's mouse leaves the window
