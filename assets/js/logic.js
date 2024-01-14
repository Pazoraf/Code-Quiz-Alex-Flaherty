var startButton = document.getElementById("start")
var mainPage = document.getElementById("questions")
var startPage = document.getElementById("start-screen")
var timer = document.getElementById("time")
var secondsLeft;
var askedQuestions = [];

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

function getRandomQuestionIndex(){
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() *questions.length);
    } while (askedQuestions.includes(randomIndex))
    return randomIndex
}


// while(askedQuestions.length<questions.length) {
//     var randomQuestionIndex = getRandomQuestionIndex();
//     var randomQuestion = questions[randomQuestionIndex];
//     askedQuestions.push(randomQuestionIndex)
// }


startButton.addEventListener("click", function() {
    startPage.classList.add("hide")
    mainPage.classList.remove("hide")
    setTime()
})

