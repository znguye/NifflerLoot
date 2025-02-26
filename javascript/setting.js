//TIMER

// Create the Time remaining bar
const timeProgressBar = document.getElementById('time-progress-bar');
const timeRemainingContainer = document.getElementById("time-remaining");

let timeRemaining = 60;
const totalTime = timeRemaining;
let timer; //blank

//Create a function to convert time into minutes and seconds
function updateTimer(){
    if (timeRemaining >0){
        timeRemaining--;

        const minutes = Math.floor(timeRemaining/60).toString().padStart(2,"0");
        const seconds = (timeRemaining%60).toString().padStart(2,"0");
        
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;

        const timePercentage = timeRemaining/ totalTime *100;
        timeProgressBar.style.width = `${timePercentage}%`
    } else {
        clearInterval(timer);
        script.showEndScreen();
    }
}


//LOOT PROGRESS

//Create a Balance bar
const progressBar = document.getElementById('progress-bar');
const balanceAmount = document.getElementById('balance-amount');

let balance = 0;
const lootTarget =500;
const totalBalance = lootTarget;
let gameObjects = window.gameObjects;

//Flag for overlapping between the Player's vs the Object's position:
console.log("Setting.js loaded. Adding checkCollision to window.");

function checkCollision(){
    
    console.log("Checking gameObjects in setting.js:", gameObjects);
if (!gameObjects || !Array.isArray(gameObjects)) {
    console.error("Error: gameObjects is undefined or not an array!");
}


    gameObjects.forEach((obj, index) =>{
        if(playerRow === obj.objectRow && playerCol === obj.Col){
            let lootValue = getLootValue(obj.type); 
            balance = balance + lootValue;

            balanceAmount.innerText = `${balance}`;

            updateLootProgress();

            obj.element.remove();
            gameObjects.splice(index,1);
        }
});
}

function getLootValue(type){
    switch(type){
        case "coin":
            return 1;
        case "diamond":
            return 5;
        case "redPocket":
            return Math.floor(Math.random()*10);
        case "cursedCoin":
            freeze(); //new
        default:
            return 0;
    }
}

function updateLootProgress(){
    const progressPercentage = (balance/totalBalance)*100;
    progressBar.innerText.style.width = `${progressPercentage}%`;

    if (balance >= lootTarget){
        script.showWinScreen();
    } else {
        script.showGameOverScreen();
    }
}


