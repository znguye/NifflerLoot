//TIME PROGRESS

// Create the Time remaining bar
const timeProgressBar = document.getElementById('time-progress-bar');
const timeRemainingContainer = document.getElementById("time-remaining");

let timeRemaining = 20;
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