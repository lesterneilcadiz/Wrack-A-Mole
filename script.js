let score = 0;
let timeLeft = 30; // Initial time
let gameInterval;
let moleInterval; // Variable to control mole appearance

document.getElementById('startButton').addEventListener('click', startGame);

function createHoles() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.innerHTML = ''; // Clear previous holes
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.onclick = whack;
    hole.innerHTML = '<div class="mole"></div>';
    gameContainer.appendChild(hole);
  }
}

function whack(event) {
  const mole = event.currentTarget.querySelector('.mole');
  if (mole.style.display === 'none') {
    return; 
  }

  mole.style.display = 'none';
  score++;
  document.getElementById('score').textContent = score;
}

function showMole() {
  const holes = document.querySelectorAll('.hole');
  const randomIndex = Math.floor(Math.random() * holes.length);
  const mole = holes[randomIndex].querySelector('.mole');
  mole.style.display = 'block'; 
  setTimeout(() => {
    mole.style.display = 'none'; // Hide the mole after a short duration
  }, 1000); // Adjust this duration (in milliseconds) as needed
}

function countdown() {
    const timerDisplay = document.getElementById('timer');
    timeLeft = 30; // Reset time to 30 seconds
    timerDisplay.textContent = timeLeft;
    gameInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(moleInterval); // Stop mole appearance
        document.getElementById('timer').textContent = 'Game Over! Wanna try Again? 0';
        showRestartButton();
        
      }
    }, 1000); 
  }
  

function startGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    clearInterval(moleInterval); // Stop mole appearance if game restarted
  }
  createHoles();
  document.querySelector('.game-container').style.display = 'grid';
  document.getElementById('timer').textContent = '30'; // Reset timer display
  hideRestartButton(); // Hide restart button if shown
  score = 0;
  document.getElementById('score').textContent = score;
  countdown();
  showMole(); // Show the first mole immediately
  moleInterval = setInterval(showMole, 2000); // Show the mole every 2 seconds (adjustable)
}

function showRestartButton() {
  const restartButton = document.getElementById('restartButton');
  restartButton.style.display = 'block';
  restartButton.addEventListener('click', startGame);
}

function hideRestartButton() {
  const restartButton = document.getElementById('restartButton');
  restartButton.style.display = 'none';
}
