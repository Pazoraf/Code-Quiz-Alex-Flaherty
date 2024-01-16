// Retrieve the highscores from localStorage
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// Get the <ol> element by its id
const highscoresList = document.getElementById('highscores');

// Function to create a new <li> element with the score text
function createHighscoreElement(score) {
  const li = document.createElement('li');
  li.textContent = score;
  return li;
}

// Function to update the highscores list
function updateHighscores() {
  // Clear the existing highscores list
  highscoresList.innerHTML = '';

  // Iterate over the highscores array and create <li> elements for each score
  highscores.forEach(score => {
    const li = createHighscoreElement(score);
    highscoresList.appendChild(li);
  });
}

// Call the updateHighscores function to initially populate the list
updateHighscores();

// Example of setting a new score to localStorage on a different sheet
// const newScore = 100;
// highscores.push(newScore);
// localStorage.setItem('highscores', JSON.stringify(highscores));

// Call the updateHighscores function again to update the list with the new score
updateHighscores();