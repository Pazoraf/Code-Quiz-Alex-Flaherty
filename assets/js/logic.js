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
var highscoresArray = JSON.parse(localStorage.getItem('highscores')) || [];
var messageElement = document.getElementById("message");

if (secondsLeft<=0 || currentQuestionIndex>questions.length){
    endQuiz()
}
startButton.addEventListener("click", function() {
    startPage.classList.add("hide")
    mainPage.classList.remove("hide")
    startQuiz()
})

submit.addEventListener("click", function(event) {
    event.preventDefault();
    var userScore = {
      username: initials.value.trim(),
      score: finalScore,
    };

    if (userScore.username === "") {
      alert("Cannot enter blank initials");
    } else if (userScore.username.length > 3) {
      alert("Initials cannot be longer than 3 characters");
    } else {
      var isDuplicate = highscoresArray.some(function(dupScore) {
        return dupScore.username === userScore.username && dupScore.score === userScore.score;
      });

      if (isDuplicate) {
        alert("Duplicate submission. Username and Score already exist.");
      } else {
        highscoresArray.push(userScore);
        localStorage.setItem('highscores', JSON.stringify(highscoresArray));
      }
    }
  });

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
        messageElement.innerHTML ="<hr><em>Correct!</em>"
    } else {
        secondsLeft -= 10;
        incorrectSound.play();
        messageElement.innerHTML ="<hr><em>Incorrect!</em>"
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
  }


