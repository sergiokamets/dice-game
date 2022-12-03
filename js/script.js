'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner', 'player--active');
  document.getElementById('players').classList.remove('player--winners');
};

// init the game
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) {
    return false;
  }
  // 1. Generating dice number;
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `images/dice-${dice}.png`;

  // 3. Check for rolled 1: if true switch player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch next player
    switchPlayer();
  }
});

// Hold the current score
btnHold.addEventListener('click', function () {
  if (!playing) {
    return false;
  }
  // 1. Add curent score to current player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player score is >= 100
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document.getElementById('players').classList.add('player--winners');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  }
  switchPlayer();
});

btnNew.addEventListener('click', init);
