// Grabbing screens
const gameIntro = document.getElementById("game-intro");
const gameInstruction = document.getElementById("game-instruction");
const gameContainer = document.getElementById("game-container");
const gameEnd = document.getElementById("game-end");
const winScreen = document.getElementById("win-screen");
const gameOverScreen = document.getElementById("game-over-screen");

// Grabbing buttons & balance
const howToLoot = document.getElementById("how-to-loot");
const startLooting = document.getElementById("start-game");
const chessboard = document.getElementById("chessboard"); //fake for now
const playAgain = document.getElementById("play-again");

let finalBalanceAmount = document.getElementsByClassName("final-balance");

// Game Container Setup

//Get elements
const player = document.getElementById("player");
const grid = document.getElementById("gridOverlay");

// Define grid size
const gridSize = 9;
function getCellSize(){
    return grid.clientWidth/ gridSize;
}

//Define the initial position of the player
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

let playerRow = getRandomInt(0,8);
let playerCol = getRandomInt(0,8);


//Create a function to update the position

function updatePlayerPosition(){
    const cellSize = getCellSize();
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



// Changing screens

howToLoot.addEventListener("click", () =>{
    gameIntro.style.display = "none";
    gameInstruction.style.display = "flex";
})

startLooting.addEventListener("click", () =>{ //add balance
    gameInstruction.style.display = "none";
    gameContainer.style.display = "flex";
    startTimer();
    //Make sure the document listens for key presses
    document.addEventListener("keydown", movePlayer);
    //Generate the initial random position
    updatePlayerPosition();
})

playAgain.addEventListener("click", () =>{
    gameEnd.style.display = "none";
    gameContainer.style.display = "flex";
    resetTimer();
    resetBalance();
    startTimer();

    //Make sure the document listens for key presses
    document.addEventListener("keydown", movePlayer);

    //Generate the initial random position
    updatePlayerPosition();
})

//Some functions to show different ending screens
function showEndScreen(){
    gameContainer.style.display = "none";

    if(balance>= lootTarget){
        showWinScreen();
    } else {
        showGameOverScreen();
    }
}

function showWinScreen(){ 
    gameContainer.style.display = "none";
    gameEnd.style.display = "flex";
    winScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    //Add a loop because finalBalanceAmount appears in 2 types of screens
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${balanceAmount.innerText}`;
    }
}

function showGameOverScreen(){ 
    gameContainer.style.display = "none";
    gameEnd.style.display = "flex";
    winScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${balanceAmount.innerText}`;
    }
}

function resetBalance(){
    balance = 0;
    balanceAmount.innertext = `${balance}`;
    progressBar.style.width = "0%";
}