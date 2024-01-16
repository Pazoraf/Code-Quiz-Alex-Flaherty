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
//If timer runs out due to too many incorrect questions or from taking too long, or if all of the questions have been exhausted then run the endquiz function.
if (secondsLeft<=0 || currentQuestionIndex>questions.length){
    endQuiz()
}
//eventlistener to run the startquiz function and change the webpage display upon pressing start button.
startButton.addEventListener("click", function() {
    startPage.classList.add("hide")
    mainPage.classList.remove("hide")
    startQuiz()
})
//eventlistener to submit user score and initials after quiz has ended. Initials must be less than 3 characters and it will not accept blank entries, if a user submits an identical score under identical initials then it will not accept. User initials and score are stored as an object and pushed into an array, and the array is saved to local storage to be processed by scores.js
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
//Timer function, if seconds left reaches 0 or lower, then timer is stopped and endquiz function is run.
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
//function to start timer and display questions, if seconds left reaches 0 or lower, or if questions run out then endquiz function is run.
function startQuiz() {
    if (secondsLeft <= 0 || currentQuestionIndex > questions.length) {
        endQuiz()
    }else{
        setTime()  
        displayQuestion();
    }
}
// function to end the quiz, page is changed to the submit menu, timer is stopped, and score is stored as total correct answers and time left on the timer.
function endQuiz(){
    mainPage.classList.add("hide")
    endPage.classList.remove("hide")
    clearInterval(timerInterval)
    finalScore= score+secondsLeft
    finalScoreText.textContent=finalScore
}

// function to display questions, function will run through each questions in the array only once, and buttons are displayed with the answers for each question using the forEach method. eventlistener is added to each button to run the checkAnswer function to determine whether an answer is correct or incorrect.
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
//function to check if an answer is correct, for each question the correct answer is stored as a number corresponding to the array index of the correct answer within the answers key. Depending on whether an answer is correct or incorrect, a different sound will play and correct or incorrect will be displayed on the screen. If correct then score increases by 1, and if incorrect 10 seconds will be taken off of the timer.
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


