var highscores = JSON.parse(localStorage.getItem('highscores'));
var highscoresList = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');

//function to render the highscore list stored in local storage. ".sort" method is used to sort the array into descending order with the highest score being displayed at the top. A list item is then created for each object in the array, and then displayed in the format "'initials' - score: 'user score'"
function renderHighscores() {
  highscores.sort((a, b) => b.score - a.score);
  for (i = 0; i < highscores.length; i++) {
    var highscore = highscores[i]
    var li = document.createElement("li", "data-index");
    li.textContent= `${highscore.username} - Score: ${highscore.score}`
    highscoresList.appendChild(li)
  }
}
//event listener to clear the list and deleted the saved highscores upon button press.
clearButton.addEventListener("click", function(event){
  event.preventDefault
  highscoresList.innerHTML = "";
  localStorage.removeItem("highscores")
})

renderHighscores()