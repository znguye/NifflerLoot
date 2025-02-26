// Grabbing screens
const gameIntro = document.getElementById("game-intro");
const gameInstruction = document.getElementById("game-instruction");
const gameContainer = document.getElementById("game-container");
const gameEnd = document.getElementById("game-end");
const winScreen = document.getElementById("win-screen");
const gameOverScreen = document.getElementById("game-over-screen");

// Grabbing buttons
const howToLoot = document.getElementById("how-to-loot");
const startLooting = document.getElementById("start-game");
const chessboard = document.getElementById("chessboard"); //fake for now
const playAgain = document.getElementById("play-again");

// Changing screens

howToLoot.addEventListener("click", () =>{
    gameIntro.style.display = "none";
    gameInstruction.style.display = "flex";
})

startLooting.addEventListener("click", () =>{
    gameInstruction.style.display = "none";
    gameContainer.style.display = "flex";
    startTimer();
})

chessboard.addEventListener("click", () =>{
    gameContainer.style.display = "none";
    gameEnd.style.display = "flex";
    winScreen.style.display = "flex";
})

playAgain.addEventListener("click", () =>{
    gameIntro.style.display = "block";
    gameEnd.style.display = "none";
    winScreen.style.display = "none";
})

function showEndScreen(){
    gameContainer.style.display = "none";
    gameEnd.style.display = "flex";
    winScreen.style.display = "flex";
}

function startTimer(){
    timer = setInterval(updateTimer,1000); //run the updateTimer function every second
}

function showWinScreen(){
    winScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
}

function showGameOverScreen(){
    winScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
}

