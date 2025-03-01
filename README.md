# NIFFLER'S LOOT


![Game logo](/Images2/Niffler_readme.gif)

## Introduction
You’ve got a Niffler - a furry little loot goblin with a nose for treasure and zero self-control. But in a world of gold and glitter, not everything is worth grabbing. Do you know how to loot wisely Try out this game to see if you can hoard as much money within a certain time limit.

## MVP
### Themes
- **Character**: Niffler, inspired by the movie **Fantastic beasts and where to find them**
- **UI**: dreamy and minimalistic, inspired by **Monument Valley**
### Win lose logic
- **Goal**: Loot enough money within a certain time limit 
- **Win**: Bank account updated; in the future your Niffler can go to the next round
- **Lose**: Bank account updated; you can play again and your bank account is reset to 0
### Basic functionalities
- **Niffler’s moves**: The player uses arrows to move their Niffler
- **Game objects**: coins, stones, red pockets and cursed coins are generated at random
    - The generated game objects must not overlap with the position of the Niffler
    - The game objects and the Niffler's location are strictly positioned within a grid cell
    - The game object disappear shortly after the Niffler moves into the object's position
- **Loot balance**: The loot balance gets updated after each collision
- **Time**: The game is over after the time runs out; the game is won as soon as the target is met
- **Screen size**: The game is not suitable for small touch screens (ipad, mobile)

## Second iteration
- [ ] Design the next levels
- [ ] Use sub-classes
- [ ] Change balance to a private field
- [ ] Upgrade the cursed coin function for the second level

### Third iteration
- [ ] Fix screen size to avoid scrolling
- [ ] Make sure the different components do not overflow & overlap
- [ ] Tripple check that the time and the balance reset each time especially when clicking "play again"
- [ ] Check bugs:
    - [ ] Sometimes points don't add
    - [ ] First object always overlaps at 0,0

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
- **Start Screen**: contains the game's name, the main logo, and the next button
- **Instruction Screen**: contains instructions on how to move the Niffler, and what objects to loot and to avoid
- **Game Screen**: where the games take place
- **Game End Screen**: contains the final score and the final status (win or lose)

## Task
- [x] **Day 1**: Game logic; HTML basic structure; CSS basic structure
- [x] **Day 2**: CSS & HTML iteration for each screen (first 4 screens of Level 1)
- [x] **Day 3**: Generate all UI components with ChatGPT, DALL-E and Adobe Express; CSS iteration
- [x] **Day 4**: Game screen; Player's classes & methods
- [x] **Day 5**: Game objects' classes & methods; Collision without points; Countdown functions; Loot balance functions; collision with points
- [x] **Day 6**: Drafted documentation excluding data structure
- [x] **Day 7**: Drafted presentation; Game logic, HTML basic structure, CSS basic structure of Level 2 and 3
- [ ] **Day 8**: Second iteration
- [ ] **Day 9**: Third iteration
- [ ] **Day 10**: Data structure documentation; Code refactor
- [ ] **Day 11**: review documentation & create the presentation slide

## Links
- [Slides Link](https://docs.google.com/presentation/d/1KTISjNAhMh3GGtTzAaSYKxxfw5YfKdt1qn2AL2ZiFlQ/edit?usp=sharing)
- [Github repository Link](https://github.com/znguye/NifflerLoot)
- [Deployment Link](znguye.github.io/NifflerLoot/)