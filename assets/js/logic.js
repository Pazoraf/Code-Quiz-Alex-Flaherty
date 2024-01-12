var startButton = document.getElementById("start")
var mainPage = document.getElementById("questions")
var startPage = document.getElementById("start-screen")
var timer = document.getElementById("time")
var secondsLeft = 0

function setTime(){
    secondsLeft= 61
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = secondsLeft;
        if (secondsLeft===0){
            clearInterval(timerInterval)
        }
    }, 1000)
}

startButton.addEventListener("click", function() {
    startPage.classList.add("hide")
    mainPage.classList.remove("hide")
    setTime()
})

