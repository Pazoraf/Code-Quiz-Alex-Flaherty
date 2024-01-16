var startButton = document.getElementById("start")
var mainPage = document.getElementById("questions")
var startPage = document.getElementById("start-screen")
var endPage = document.getElementById("end-screen")
var timer = document.getElementById("time")
var finalScoreText= document.getElementById("final-score")
var submit = document.getElementById("submit")
var initials = document.getElementById("initials")
var secondsLeft = 61;
var score = 0;
var finalScore;
var currentQuestionIndex = 0;
var questionTitle= document.getElementById("question-title");
var questionChoices = document.getElementById("choices");
var timerInterval
var correctSound = new Audio('assets/sfx/correct.wav')
var incorrectSound = new Audio('assets/sfx/incorrect.wav')

if (secondsLeft<=0 || currentQuestionIndex>questions.length){
    endQuiz()
}
startButton.addEventListener("click", function() {
    startPage.classList.add("hide")
    mainPage.classList.remove("hide")
    startQuiz()
})

submit.addEventListener("click", function(event){
    event.preventDefault()
    var userScore ={
        username: initials.value.trim(),
        score: finalScore,
    }
    if(userScore.username===""){
        alert("Can not enter blank initials")
    }else if (userScore.username.length>3){
        alert("Initials can not be longer than 3 characters")
    }else{
        var userScoreObj= JSON.stringify(userScore)
        localStorage.setItem('highscores', userScoreObj)
}})

function setTime(){
    secondsLeft= 61
    timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = secondsLeft;
        if (secondsLeft<=0){
            clearInterval(timerInterval)
            endQuiz()
        }
    }, 1000)
}

function startQuiz() {
    if (secondsLeft <= 0 || currentQuestionIndex > questions.length) {
        endQuiz()
    }else{
        setTime()  
        displayQuestion();
    }
}
  
function endQuiz(){
    mainPage.classList.add("hide")
    endPage.classList.remove("hide")
    clearInterval(timerInterval)
    finalScore= score+secondsLeft
    finalScoreText.textContent=finalScore
}


function displayQuestion() {
    var question = questions[currentQuestionIndex];
    questionTitle.textContent = question.question;
    questionChoices.innerHTML = "";
    question.answers.forEach((answer, index) => {
        var button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => {
            checkAnswer(index);
      });
    questionChoices.appendChild(button);
    });
  }

function checkAnswer(index) {
    var question = questions[currentQuestionIndex];
    if (index === question.correct) {
        score++;
        correctSound.play();
    } else {
        secondsLeft -= 10;
        incorrectSound.play();
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
  }


