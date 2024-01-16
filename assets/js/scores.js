var highscores = JSON.parse(localStorage.getItem('highscores'));
var highscoresList = document.querySelector('#highscores');
var highscoresArray = [];

function renderHighscores() {
  var highscoresString = localStorage.getItem('savedHighscores');
  if (highscoresString === null) {
    return;
  }
  highscores = JSON.parse(highscoresString);
  highscoresArray.push(...highscores);
}
function saveHighscores(){
  var highscoresArrayString = JSON.stringify(highscoresArray)
  localStorage.setItem("savedHighscores", highscoresArrayString)
}

renderHighscores()
saveHighscores()
console.log(highscoresArray)