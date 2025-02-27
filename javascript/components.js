
const lootTarget = 100000;
let timeRemaining = 30;
const maxObjects = 20;
let maxTime = 2000; // time an object remains

//TIME PROGRESS

// Create the Time remaining bar
const timeProgressBar = document.getElementById('time-progress-bar');
const timeRemainingContainer = document.getElementById("time-remaining");


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
        window.showEndScreen();
    }
}

function startTimer(){
    clearInterval(timer);
    timer = setInterval(updateTimer,1000); //run the updateTimer function every second
}

function resetTimer(){
    clearInterval(timer);
    timeRemaining = totalTime;

    const minutes = Math.floor(timeRemaining/60).toString().padStart(2,"0");
    const seconds = (timeRemaining%60).toString().padStart(2,"0");

    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    timeProgressBar.style.width = "100%";
}


class GameObject { 
    constructor(type, gridSize, playerRow, playerCol){
        // //This class is active when the gameScreen is on
        // this.gameScreen = gameScreen;

        this.type = type;
        this.gridSize = gridSize; 
        this.row = 0;
        this.col = 0;
        this.element = null;

        this.objectPosition(playerRow, playerCol); //a function to flag the player's position
    }

    // Make sure the game objects do not overlap with the player's position and existing objects
    objectPosition(playerRow, playerCol){
        let objectPosition = false;

        while(!objectPosition) {
            this.objectRow = Math.floor(Math.random() * this.gridSize);
            this.objectCol = Math.floor(Math.random() * this.gridSize);

            if(this.objectRow !== playerRow && this.objectCol !== playerCol){ //avoiding player's current position
                objectPosition = true;
            }

            for (let i=0; i <gameObjects.length; i++){
                if(gameObjects[i].objectRow !== this.objectRow && gameObjects[i].objectCol !== this.objectCol){
                    objectPosition = true;
                    break;
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
const objectTypes = ["coin", "diamond", "redPocket", "cursedCoin"];
let gameObjects = [];

function generateGameObjects(playerRow, playerCol){
    
    if (gameObjects.length <= maxObjects){
        let type = objectTypes[Math.floor(Math.random() * objectTypes.length)]
        let newObject = new GameObject(type, 9, playerRow, playerCol);
        gameObjects.push(newObject);
    }
}

//Set frequency of how often objects are generated
setInterval(() => {
    generateGameObjects(playerRow, playerCol);
}, Math.floor(Math.random()*2000 + 500))

//----------------------------------------------------------------------------------------//


//LOOT PROGRESS

//Create a Balance bar
const progressBar = document.getElementById('progress-bar');
const balanceAmount = document.getElementById('balance-amount');

let balance = 0;
const totalBalance = lootTarget;



//Flag for overlapping between the Player's vs the Object's position:

function checkCollision(){
    for (let i=0; i<gameObjects.length; i++) {
        let obj = gameObjects[i];
        
        if(playerRow === obj.objectRow && playerCol === obj.objectCol){
            let lootValue = getLootValue(obj.type); 
            balance = balance + lootValue;
            balanceAmount.innerText = `${balance}`;
            updateLootProgress();

            setTimeout(() =>{
                obj.element.remove();
                gameObjects = gameObjects.filter(item => item !== obj);
            }, 200);
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
            return -3000;
        default:
            return 0;
    }
}

function updateLootProgress(){
    const progressPercentage = (balance/totalBalance)*100;
    progressBar.style.width = `${progressPercentage}%`;

    if (balance >= lootTarget){
        clearInterval(timer);
        showWinScreen();
    }
}


