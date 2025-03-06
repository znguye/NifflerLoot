// LEVEL SETUP
let currentLevel = 1;
let musicLevel = null;

const music = {
    funnyFootstep: document.getElementById("funny-footstep-music"),
    sillyChase: document.getElementById("silly-chase-music"),
}

const levels = {
    1: {name: "Mission 1", lootTarget: 20000, time: 30, maxTime: 3500, maxObjects:10, cursedEffect: "balanceDeduction", cursedText: "-$3000", music: music.funnyFootstep},
    2: {name: "Mission 2", lootTarget: 50000, time: 60, maxTime: 2500, maxObjects:20, cursedEffect: "reverseControls", cursedText: "reversed arrows", music: music.sillyChase},
    3: {name: "Mission 3", lootTarget: 100000, time: 90, maxTime: 2000, maxObjects:20, cursedEffect: "reverseControls", cursedText: "reversed arrows", music: music.sillyChase},
};

// Grab content
const elements = {
    missionTitle: document.getElementById("challenge-title-text"),
    lootTarget: document.getElementById("target-amount"),
    timeDisplay: document.getElementById("time-remaining-target"),
    cursedText: document.getElementById("penalty"),
    balanceAmount: document.getElementById("balance-amount"),
    progressBar: document.getElementById('progress-bar'),
    timeRemainingContainer: document.getElementById("time-remaining"),
    timeProgressBar: document.getElementById('time-progress-bar'),
}

// Initialise everything to avoid errors
let timeRemaining, timer, lootTarget, maxObjects, maxTime, cursedEffect, totalTime;
let balance = 0;


//ADDING MUSIC
function setLevelMusic(level){
    if (levels[level] && levels[level].music){
        musicLevel = levels[level].music;
    }
}

function startMusic(){
    if (musicLevel){
        // console.log("music started");
        musicLevel.play();
    }// else {console.log("musicLevel issue", musicLevel)}
}

function stopMusic(){
    // console.log("any music stopped");
    Object.values(music).forEach(song =>{
        if (song && !song.pause()){
            song.pause();
            song.currentTime =0;
        }
    })
}

function playMusic(){
    setLevelMusic(currentLevel);
    stopMusic();
    startMusic();
}


// WIN/ GAME OVER SCREENS (DEPENDENT ON THE LOOT BALANCE)
const finalBalanceAmount = document.getElementsByClassName("final-balance"); //amount when game ends, appears in 2 screens

function showWinScreen(){ 
    // console.log("showWinScreen")
    switchScreen(screens.gameOverScreen, screens.winScreen, "flex");
    // console.log("cur", currentLevel, "ref", levels)
    if (levels[currentLevel+1] == undefined){
        document.getElementById("next-level").style.display = "none";
    }
    
    //Add a loop because finalBalanceAmount appears in 2 types of screens
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${elements.balanceAmount.innerText}`;
    }
}

function showGameOverScreen(){ 
    switchScreen(screens.winScreen, screens.gameOverScreen, "flex");
    for (let i=0; i<finalBalanceAmount.length; i++){
        finalBalanceAmount[i].innerText = `${elements.balanceAmount.innerText}`;
    };
}


// LEVEL SET UP
function loadLevel(level){
    // console.log("loadLevel called");

    //Update UI
    elements.missionTitle.innerText = levels[level].name;
    elements.lootTarget.innerText = `$${levels[level].lootTarget.toLocaleString()}`;
    elements.timeDisplay.innerText = formatTime(levels[level].time);
    elements.timeRemainingContainer.innerText = formatTime(levels[level].time);
    elements.cursedText.innerText = levels[level].cursedText;

    //Update game logic
    timeRemaining = levels[level].time;
    totalTime = timeRemaining;
    maxTime = levels[level].maxTime;
    maxObjects = levels[level].maxObjects;
    cursedEffect = levels[level].cursedEffect;
    lootTarget = levels[level].lootTarget;

    //Reset progress
    balance = 0;
    updateLootProgress(); 
    resetTimer(); 
    resetBalance();
}


// TIME FUNCTIONS
// Convert seconds into MM:SS
function formatTime(time){
    const minutes = Math.floor(time/60).toString().padStart(2,"0");
    const seconds = (time%60).toString().padStart(2,"0");
    return `${minutes}:${seconds}`;
}

//Reset the timer to the original time remaining value
function resetTimer(){
    // console.log("resetTimer loaded");
    clearInterval(timer);
    timeRemaining = totalTime;
    elements.timeRemainingContainer.innerText = formatTime(timeRemaining);
    elements.timeProgressBar.style.width = "100%";
}

//Start the timer at game screen
function startTimer(){
    // console.log("startTimer called");
    clearInterval(timer);
    loadLevel(currentLevel);
    timer = setInterval(updateTimer,1000); //run the updateTimer every second
}

//Update the time remaining every second
function updateTimer(){
    // console.log("updateTimer called");
    if (timeRemaining > 0){
        timeRemaining--;

        elements.timeRemainingContainer.innerText = formatTime(timeRemaining);
        const timePercentage = (timeRemaining/ totalTime) *100;
        elements.timeProgressBar.style.width = `${timePercentage}%`

    } else {
        clearInterval(timer);
        showEndScreen();
    }
}


//LOOT BALANCE FUNCTIONS

function resetBalance(){
    // console.log("resetBalance called");
    balance = 0;
    elements.balanceAmount.innerText = "0";
    elements.progressBar.style.width = "0%";
}

function updateLootProgress(){
    // console.log("lootProgress updated");
    elements.balanceAmount.innerText = balance;
    const progressPercentage = (balance/lootTarget)*100;
    elements.progressBar.style.width = `${progressPercentage}%`;

    if (balance >= lootTarget){
        clearInterval(timer);
        showEndScreen();
        showWinScreen();
    }
}


//GENERATING GAME OBJECTS
let gameObjects = [];
const objectTypes = ["coin", "diamond", "redPocket", "cursedCoin"]; //same object, different types

class GameObject { 
    constructor(type){
        this.type = type;
        this.gridSize = gridSize; 
        this.row = 0;
        this.col = 0;
        this.element = null;
        this.objectPosition();
    }

    // Make sure the game objects do not overlap with the player's position and existing objects
    objectPosition(){
        let validPosition = false;

        while(!validPosition) {
            this.objectRow = Math.floor(Math.random() * gridSize);
            this.objectCol = Math.floor(Math.random() * gridSize);

            if(this.objectRow !== playerRow && this.objectCol !== playerCol){ 
                validPosition = true;
            }
            for (let i=0; i <gameObjects.length; i++){
                if(gameObjects[i].objectRow !== this.objectRow && gameObjects[i].objectCol !== this.objectCol){
                    validPosition = true;
                }
            }
        } this.createGameObject();
    }

    //Create a function to append the objects in the grid for a duration of time
    createGameObject(){
        this.element = document.createElement("div");
        this.element.classList.add("game-object", this.type);

        const cellSize = getCellSize();
        this.element.style.transform = `translate(${this.objectCol*cellSize}px, ${this.objectRow*cellSize}px)`;

        document.getElementById("gridOverlay").appendChild(this.element);

        //Set the duration of object's appearance
        setTimeout(() => {
            this.element.remove();
            gameObjects = gameObjects.filter(obj => obj !== this); 
        }, maxTime)
    }
}

//Generate random objects during an interval
function generateGameObjects(){    
    if (gameObjects.length <= maxObjects){
        let type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        let newObject = new GameObject(type);
        gameObjects.push(newObject);
    }
}


// CURSED EFFECTS CHANGE
function cursedCoinCollision(){
    switch(cursedEffect){
        case"balanceDeduction": return -3000;
        case "reverseControls": cursedArrowsReversed(); return 0;
    }

}


//COLLISION
function checkCollision(){
    for (let i=0; i<gameObjects.length; i++) {
        let obj = gameObjects[i];
        
        if(playerRow === obj.objectRow && playerCol === obj.objectCol){
            let lootValue = getLootValue(obj.type); 
            balance += lootValue;
            updateLootProgress();

            setTimeout(() =>{
                obj.element.remove();
                gameObjects = gameObjects.filter(item => item !== obj);
            }, 150);
            break;
        }         
    }   
}

function getLootValue(type){
    switch(type){
        case "coin":
            return 1000;
        case "diamond":
            return 5000;
        case "redPocket":
            return Math.round(Math.random())*10000;
        case "cursedCoin":
            return cursedCoinCollision();
        default:
            return 0;
    }
}




