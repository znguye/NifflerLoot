# NIFFLER'S LOOT


![Game logo](/Images2/Niffler-logo.png)

## Introduction
You’ve got a Niffler—a furry little loot goblin with a nose for treasure and zero self-control. But in a world of gold and glitter, not everything is worth grabbing. Do you know how to loot wisely Try out this game to see if you can hoard as much money within a certain time limit.

## MVP
### Themes
- Character: Niffler, inspired by the movie Fantastic beasts and where to find them
- UI: dreamy and minimalistic, inspired by Monument Valley
### Win lose logic
- Goal: Loot enough money within a certain time limit 
- Win: Bank account updated; in the future your Niffler can go to the next round
- Lose: Bank account updated; you can play again and your bank account is reset to 0
### Basic functionalities
- Niffler’s moves: The player uses arrows to move their Niffler
- Game objects: coins, stones, red pockets and cursed coins are generated at random, without overlapping with the position of the Niffler
- Game objects and the Niffler's location are strictly within a grid cell
- The object disappear shortly after the Niffler moves to the object's position
- The bank balance gets updated after each collision
- Game is over after the time runs out; game is won as soon as the target is met


## Bug to fix
- Implement the Freeze function
- Tripple check that the time and the balance reset each time
- Tripple check for overlapping
- Check bugs:
    - Sometimes points doesn’t add
    - First object always overlaps at 0,0

## Backlog
- Betting
- Highest scorer
- Animation of Niffler
- Money rain during win screen
- Sound effect for each type of coin
- Cursed coin = 5 then game is over + different message
- Cursed coin = freeze for 2 seconds or arrow keys mean the opposite
- Add another round with a different target
- The challenge screen has different milestones for the rounds

## Data structure
List of classes and methods (TBD); format = toggle list

## States y States Transitions
- Start Screen: contains the game's name, the main logo, and the next button
- Instruction Screen: contains instructions on how to move the Niffler, and what objects to loot and to avoid
- Game Screen: where the games take place
- Game End Screen: contains the final score and the final status (win or lose)

## Task
- Day 1: Map out the game logic on a document & set up the html structure
- Day 2: Build the CSS logic for each screen by hiding the other screens with each click
- Day 3: Generate all of the UI components with ChatGPT, DALL-E and Adobe Express and improve the CSS code
- Day 4: Build the grid structure on the game screen instead of a matrix to make generate the Niffler and the game objects; create the different classes and functions to move the Niffler in the grid
- Day 5: Create the different functions to generate the objects randomly and remove the objects after N seconds; Create functions to update the time and the loot balance amount; Add in the remaining javascript to make sure everything runs in every screen change
- Day 6: Write the first readme for the first iteration; start documenting the data structure
- Before presentation day: review documentation & create the presentation slide

## Links
- [Slides Link](https://docs.google.com/presentation/d/1KTISjNAhMh3GGtTzAaSYKxxfw5YfKdt1qn2AL2ZiFlQ/edit?usp=sharing)
- [Github repository Link](https://github.com/znguye/NifflerLoot)
- [Deployment Link](znguye.github.io/NifflerLoot/)