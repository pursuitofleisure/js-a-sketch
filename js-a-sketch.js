// select the elements on the page (canvas, button)
const canvas = document.querySelector('#etch-a-sketch');
// place where we do drawing is context
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// d-pad buttons
const dPads = document.querySelectorAll('.d-pad button');

// set up our canvas for drawing
// ensures smooth drawing

// make a variable called height and width from the same properties on our canvas
const { width, height } = canvas;

// create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT; // in pixels, default is 1

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y); // 200 pixels from left and from top
ctx.lineTo(x, y); // invisible line from start
ctx.stroke(); // put a dot at the location

// check if the edge of the canvas has been reached for both X and Y
function checkEdgeX() {
  if (x < -30) {
    x = 1600;
    ctx.moveTo(x, y);
  } else if (x > 1630) {
    x = 0;
    ctx.moveTo(x, y);
  }
}

function checkEdgeY() {
  if (y < -30) {
    y = 1000;
    ctx.moveTo(x, y);
  } else if (y > 1000) {
    y = 0;
    ctx.moveTo(x, y);
  }
}

// write a draw function
// pass options object instead of multiple arguments
// destructuring
// can destructure options object into 'key' variable
function draw({ key }) {
  // increment the hue
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x, y values depending on what the user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      checkEdgeY();
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      checkEdgeX();
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      checkEdgeY();
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      checkEdgeX();
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault(); // prevent arrow keys from moving the page down
    draw({ key: e.key });
  }
}

// write a handler for the directional buttons
function handleDirection(e) {
  // console.log(e.target.classList);
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath(); // start the path
  ctx.moveTo(x, y);
  if (e.target.classList.contains('up')) {
    y -= MOVE_AMOUNT;
    checkEdgeY();
  }
  if (e.target.classList.contains('down')) {
    y += MOVE_AMOUNT;
    checkEdgeY();
  }
  if (e.target.classList.contains('left')) {
    x -= MOVE_AMOUNT;
    checkEdgeX();
  }
  if (e.target.classList.contains('right')) {
    x += MOVE_AMOUNT;
    checkEdgeX();
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// clear or shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true } // calls remove event listener for you once animation is done, otherwise will keep adding event listeners
  );
}

// listen for arrow keys and buttons
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);

// Select all direction buttons and assign event handler
dPads.forEach(function(dPad) {
  dPad.addEventListener('click', handleDirection);
});