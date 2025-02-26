// Game Container Setup

//Get elements
const player = document.getElementById("player");
const grid = document.getElementById("gridOverlay");

// Define grid size
const gridSize = 9;
const cellSize = grid.clientWidth/ gridSize;

//Define the initial position of the player
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

let playerRow = getRandomInt(0,8);
let playerCol = getRandomInt(0,8);


//Create a function to update the position
function updatePlayerPosition(){
    const positionX = playerCol * cellSize;
    const positionY = playerRow * cellSize;

    player.style.transform = `translate(${positionX}px, ${positionY}px)`;
}

//Create a function to move the player with key press
function movePlayer(event){
    switch (event.key){
        case "ArrowUp":
            if (playerRow >0){ playerRow --}; //make sure player doesn't go out of the edge
            break;
        case "ArrowDown":
            if (playerRow < gridSize -1) {playerRow++};
            break;
        case "ArrowLeft":
            if (playerCol >0) {playerCol --};
            break;
        case "ArrowRight":
            if (playerCol < gridSize -1) {playerCol ++};
            break;
        default:
            return; // Ignore other keys
    }
    updatePlayerPosition()
    checkCollision();
}

//Make sure the document listens for key presses
document.addEventListener("keydown", movePlayer);

//Generate the initial random position
updatePlayerPosition();

//----------------------------------------------------------------------------------------//





