// SET UP
const gridSize = 9; // to change this if ChatGPT can generate a different chessboard


const screens = {
    gameIntro: document.getElementById("game-intro"),
    gameInstruction: document.getElementById("game-instruction"),
    gameChallenge: document.getElementById("game-challenge"),
    gameContainer: document.getElementById("game-container"),
    gameEnd: document.getElementById("game-end"),
    winScreen: document.getElementById("win-screen"),
    gameOverScreen: document.getElementById("game-over-screen"),
}

const buttons = {
    howToLoot: document.getElementById("how-to-loot"),
    startLooting: document.getElementById("start-game"),
    play: document.getElementById("play-button"),
    playAgain: [document.getElementById("play-again1"), document.getElementById("play-again2")],
    nextLevel: document.getElementById("next-level"),
}

let playerRow;
let playerCol;


// CHANGING SCREENS
buttons.howToLoot.addEventListener("click", () => switchScreen(screens.gameIntro, screens.gameInstruction, "flex"));
buttons.startLooting.addEventListener("click", () => switchScreen(screens.gameInstruction, screens.gameChallenge, "flex"));

buttons.play.addEventListener("click", () => {
    console.log("play button clicked");
    switchScreen(screens.gameChallenge, screens.gameContainer, "flex");
    playFunction();
    playMusic();
    resetPlayerPosition();
    startGameObjectsGeneration();    
    document.addEventListener("keydown", movePlayer); //Make sure the document listens for key presses
    updatePlayerPosition(); // drop the Niffler in the grid
});

buttons.nextLevel.addEventListener("click", () =>{
    console.log("next level button clicked");
    switchScreen(screens.gameEnd, screens.gameChallenge, "flex");
    currentLevel++;
    loadLevel(currentLevel);
})

buttons.playAgain.forEach(playAgainButton => playAgainButton.addEventListener("click", () => restartGame()));


// SOME FUNCTIONS TO BE RUN WHEN CHANGING SCREENS
function switchScreen(fromScreen, toScreen, displayType){
    fromScreen.style.display = "none";
    toScreen.style.display = displayType; 
}

function playFunction(){
    resetTimer();
    resetBalance();
    startTimer();
}

//Set frequency of how often objects are generated
function startGameObjectsGeneration(){
        setInterval(() => {
            generateGameObjects();
        }, Math.floor(Math.random()*2000 + 500))
}

function restartGame(){
    console.log("restartGame function called");
    switchScreen(screens.gameEnd, screens.gameContainer, "flex");
    playFunction();
    playMusic();
    document.addEventListener("keydown", movePlayer);
    resetPlayerPosition();
    updatePlayerPosition();
    startGameObjectsGeneration();
}


//END SCREEN(S)
function showEndScreen(){
    switchScreen(screens.gameContainer, screens.gameEnd, "flex");

    if(balance >= lootTarget){
        showWinScreen();
    } else {
        showGameOverScreen();
    }
}
// Win screen and Game over screen are on the other JS file where the balance will be calculated

// GAME CONTAINER SETUP (WHERE THE NIFFLER WILL BE LOCATED)
const player = document.getElementById("player");
const grid = document.getElementById("gridOverlay");

function getCellSize(){
    return grid.clientWidth/ gridSize;
}

//Define the initial position of the player (3 steps)
//Step 3: Map the player's position in the grid
function updatePlayerPosition(){
    const cellSize = getCellSize(); // returns the size of each grid cell
    const positionX = playerCol * cellSize;
    const positionY = playerRow * cellSize;

    player.style.transform = `translate(${positionX}px, ${positionY}px)`;
}

//Step 2: Update the position with the generated numbers
function resetPlayerPosition(){
    playerRow = getRandomInt(0,8); // number should be between 0 and 8 so the niffler doesn't go outside of the grid
    playerCol = getRandomInt(0,8);
    updatePlayerPosition();
}

//Step 1: Generate a number for each of the x, y axis
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}


// MOVE THE NIFFLER
// Create a function to move the player with key press
function movePlayer(event){
    switch (event.key){
        case "ArrowUp": if (playerRow >0){ playerRow --}; 
            break;
        case "ArrowDown": if (playerRow < gridSize -1) {playerRow++};
            break;
        case "ArrowLeft": if (playerCol >0) {playerCol --};
            break;
        case "ArrowRight": if (playerCol < gridSize -1) {playerCol ++};
            break;
        default: return; // Returns nothing when other keys are pressed
    }
    updatePlayerPosition()
    checkCollision();
}


//CURSED COIN LEVEL 2
function arrowsReversed(event){
    switch (event.key){
        case "ArrowDown": if (playerRow >0){ playerRow --}; 
            break;
        case "ArrowUp": if (playerRow < gridSize -1) {playerRow++};
            break;
        case "ArrowRight": if (playerCol >0) {playerCol --};
            break;
        case "ArrowLeft": if (playerCol < gridSize -1) {playerCol ++};
            break;
        default: return; 
    }
    updatePlayerPosition()
    checkCollision();
}

function cursedArrowsReversed(){
    console.log("arrows reversed for 5 secs");
    document.removeEventListener("keydown", movePlayer);
    document.addEventListener("keydown", arrowsReversed);

    setTimeout(() => {
        console.log("time out!");
        document.removeEventListener("keydown", arrowsReversed);
        document.addEventListener("keydown", movePlayer);
    },5000);
}


