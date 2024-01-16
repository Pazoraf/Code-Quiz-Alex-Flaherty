var highscores = JSON.parse(localStorage.getItem('highscores'));
var highscoresList = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');


function renderHighscores() {
  highscores.sort((a, b) => b.score - a.score);
  for (i = 0; i < highscores.length; i++) {
    var highscore = highscores[i]
    var li = document.createElement("li", "data-index");
    li.textContent= `${highscore.username} - Score: ${highscore.score}`
    highscoresList.appendChild(li)
  }
}

clearButton.addEventListener("click", function(event){
  event.preventDefault
  highscoresList.innerHTML = "";
  localStorage.removeItem("highscores")
})

renderHighscores()