window.gameObjects = [];
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
        } this.createGameObject();
    }

    //Create a function to append the objects in the grid for a duration of time
    createGameObject(){
        this.element = document.createElement("div");
        this.element.classList.add("game-object", this.type);
        this.element.style.transform = `translate(${this.objectCol*cellSize}px, ${this.objectRow*cellSize}px)`;

        document.getElementById("gridOverlay").appendChild(this.element);

        //Set the duration of object's appearance
        let maxTime = 5000;
        setTimeout(() => {
            this.element.remove();
            gameObjects = gameObjects.filter(obj => obj !== this); 
        }, maxTime)
    }
}


//Generate random objects during an interval
const maxObjects = 7;
const objectTypes = ["coin", "diamond", "redPocket", "cursedCoin"];

function generateGameObjects(playerRow, playerCol){
    
    if (gameObjects.length <= maxObjects){
        let type = objectTypes[Math.floor(Math.random() * objectTypes.length)]
        let newObject = new GameObject(type, 9, playerRow, playerCol);

        return gameObjects.push(newObject);
    }
}

//Set frequency of how often objects are generated
setInterval(() => {
    generateGameObjects(playerRow, playerCol);
}, Math.floor(Math.random()*2000+1000))