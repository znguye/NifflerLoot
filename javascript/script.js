// Grabbing screens
const gameIntro = document.getElementById("game-intro");
const gameInstruction = document.getElementById("game-instruction");
const gameContainer = document.getElementById("game-container");
const gameEnd = document.getElementById("game-end");
const winScreen = document.getElementById("win-screen");
const gameOverScreen = document.getElementById("game-over-screen");

// Grabbing buttons & elements
const howToLoot = document.getElementById("how-to-loot");
const startLooting = document.getElementById("start-game");
const chessboard = document.getElementById("chessboard"); //fake for now
const playAgain = document.getElementById("play-again");

const finalBalanceAmount = document.getElementsByClassName("final-balance");
const balanceAmount = document.getElementById("balance-amount");
let startingAmount = 0;

// Changing screens

howToLoot.addEventListener("click", () =>{
    gameIntro.style.display = "none";
    gameInstruction.style.display = "flex";
})

startLooting.addEventListener("click", () =>{ //add balance
    gameInstruction.style.display = "none";
    gameContainer.style.display = "flex";
    startTimer();
})

playAgain.addEventListener("click", () =>{
    gameEnd.style.display = "none";
    gameContainer.style.display = "flex";
    resetTimer();
    resetBalance();
    startTimer();
})

//Some functions to show different ending screens
function showEndScreen(){
    gameContainer.style.display = "none";
    gameEnd.style.display = "flex";
    clearInterval(timer);
}

function showWinScreen(){ //add balance
    winScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    //Add a loop because finalBalanceAmount appears in 2 types of screens
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${balanceAmount}`;
    }
    

}

function showGameOverScreen(){ //add balance
    winScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${balanceAmount}`;
    }
}

function resetBalance(){
    balanceAmount.innertext = `${startingAmount}`;
}