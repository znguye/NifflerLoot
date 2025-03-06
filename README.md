# NIFFLER'S LOOT


![Game logo](/Images2/Niffler_readme.gif)

## Introduction
You’ve got a Niffler - a furry little loot goblin with a nose for treasure and zero self-control. But in a world of gold and glitter, not everything is worth grabbing. Do you know how to loot wisely? Try out this game to see if you can hoard as much money within a certain time limit.

## MVP
### Themes
- **Character**: Niffler, inspired by the movie **Fantastic beasts and where to find them**
- **UI**: dreamy and minimalistic, inspired by **Monument Valley**
### Win lose logic
- **Goal**: Loot enough money within a certain time limit 
- **Win**: Your Niffler can go to the next round
- **Lose**: You can play again
### Basic functionalities
- **Niffler’s moves**: The player uses arrows to move their Niffler
- **Game objects**: coins, stones, red pockets and cursed coins are generated at random
    - The generated game objects must not overlap with the current position of the Niffler
    - The game objects and the Niffler's location are strictly positioned within a grid cell
    - The game object disappear shortly after the Niffler moves into the object's position
- **Loot balance**: The loot balance gets updated after each collision, and is restarted before each round begins
- **Time**: The game is over after the time runs out; the game is won as soon as the target is met
- **Screen size**: The game is not suitable for small touch screens (ipad, mobile)

## Iterations
### Second iteration
- [x] Add 2 more levels with different settings
- [x] Upgrade the cursed coin function for the next level
- [x] Refactor code to make it easier to add levels

### Third iteration
- [x] Add music
- [x] Fix screen size to avoid scrolling & make sure components don't overflow
- [x] Generate different random ending messages for both levels

## Backlog
- [ ] Next level: A new game object - banana, which will make your Niffler slide *#designheavy*
- [ ] Next level: If the Niffler gets stuck in any cursed coin 5 times, the game is over
- [ ] Next level: Cursed coin means random telepot 
- [ ] Betting function for points multiplier *#designheavy*
- [ ] Saving the fastest loot during each round *#designheavy*
- [ ] Modify the Challenge screen so you can click on a map to go back a level *#designheavy*
- [ ] Fix bugs: Sometimes points don't add because the Niffler moves at the same time as the object being generated
- [ ] Add shortcuts to stop the music + instruction when hovering your mouse on the music icon

## Class explanation & anything related to the game objects
After the third iteration, the game contains one class - `GameObject`
<br>
First, create an empty array to store the game objects after they are created. This is needed to make sure there are not too many objects being generated at the same time. Later on, we will define the maximum number of objects that can be generated at the same time.

```javascript
let gameObjects = [];
```
<br>
Create another array to store the game object types. This makes it easier to add different objects later on, and to associate each object with a different collision effect.

```javascript
const objectTypes = ["coin", "diamond", "redPocket", "cursedCoin"]; 
```

<br>
Create a class called `GameObject` that includes a constructor and some functions. The constructor only needs the object type as a parameter because all objects are treated equally. 
<br>
Inside the constructor, include also the initial position of the object (0,0) just to initialise it and we'll change the position later on. We should also include the gridSize which is a global variable, a placeholder for each object, and a method to be called to initialise the object's position. 

```javascript
class GameObject { 
    constructor(type){
        this.type = type;
        this.row = 0;
        this.col = 0;
        this.gridSize = gridSize; 
        this.element = null;
        this.objectPosition();
    }

    objectPosition(){};
    createGameObject(); 
    // We will elaborate on this later on
}
```
<br>
With the `objectPosition` function, first, we need to make sure that (1) the object is generated at random, (2) the object is generated into the grid div, and (3) the object fits into the grid cell.
<br>
We also need to make sure that the object does not overlap with the current position of the niffler. 
<br>
As we are generating many objects at the same time, it is more useful to create a loop to validate the generated object's position with the niffler's position. 
<br> 
Lastly, we need to call the `createGameObject` function so that there are objects to be evaluated in this function.

```javascript
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
```
<br>
Next, let's create the `createGameObject` function to append the objects into the `gameObjects` array during a duration of time.
<br>
First, we will need to create a div in the html to store the game object.  We'll add a class `game-object` to this div so that we can modify all objects the same way later on. 
<br>
Then, we'll need to relocate (transform) the object to a random position that is incide the grid cell. Once we've defined this position, we'll aphend the object inside the document's grid.
<br>
Lastly, create a `setTimeout` to make sure the object only stays for a while, and the maximum time is a property that is dependent on the level of the game. Make sure the `gameObjects` array only contain the remaining game objects. 

```javascript
createGameObject(){
    this.element = document.createElement("div");
    this.element.classList.add("game-object", this.type);

    const cellSize = getCellSize();
    this.element.style.transform = `translate(${this.objectCol*cellSize}px, ${this.objectRow*cellSize}px)`;

    document.getElementById("gridOverlay").appendChild(this.element);

    setTimeout(() => {
        this.element.remove();
        gameObjects = gameObjects.filter(obj => obj !== this); 
    }, maxTime)
}
```

Next, create a function to generate the game object at random interval. Inside this function, initialise the Game Object class using a random type of object, and add it into the gameObjects array.
```javascript
function generateGameObjects(){    
    if (gameObjects.length <= maxObjects){
        let type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        let newObject = new GameObject(type);
        gameObjects.push(newObject);
    }
}
```
<br>
Additionally, below is the function to make sure that the grid fit the div. The `gridSize` is a constant that is the number of cell of the chessboard in which the niffler and the game objects are located.

```javascript
function getCellSize(){
    return grid.clientWidth/ gridSize;
}
```

## States y States Transitions
- **Start Screen**: contains the game's name, the main logo, and the next button
- **Instruction Screen**: contains instructions on how to move the Niffler, and what objects to loot and to avoid
- **Game Screen**: where the games take place
- **Game End Screen**: contains the final score and the final status (win or lose)

## Task
- [x] **Step 1**: Game logic; HTML basic structure; CSS basic structure
- [x] **Step 2**: CSS & HTML iteration for each screen (first 4 screens of Level 1); screen switch functions;
- [x] **Step 3**: Generate all UI components with ChatGPT, DALL-E and Adobe Express; CSS iteration
- [x] **Step 4**: Game screen; Player's classes & methods
- [x] **Step 5**: Game object classes & methods; Collision without points; Countdown functions; Loot balance functions; collision with points
- [x] **Step 6**: Drafted documentation excluding data structure
- [x] **Step 7**: Drafted presentation; Game logic, HTML basic structure, CSS basic structure of Level 2
- [x] **Step 8**: Second iteration of the game screen; Code refactor
- [x] **Step 9**: Third iteration; add music 
- [ ] **Step 10**: Data structure documentation; 
- [ ] **Step 11**: review documentation & create the presentation slide

## Links
- [Slides Link](https://docs.google.com/presentation/d/1KTISjNAhMh3GGtTzAaSYKxxfw5YfKdt1qn2AL2ZiFlQ/edit?usp=sharing)
- [Github repository Link](https://github.com/znguye/NifflerLoot)
- [Deployment Link](znguye.github.io/NifflerLoot/)