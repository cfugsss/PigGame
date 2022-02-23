 'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.innerHTML = 0;
score1El.innerHTML = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const newGame = function () {
  window.location.reload();
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).innerHTML = 0; // setting the active players current score back to zero
  activePlayer = activePlayer === 0 ? 1 : 0; // switching active player
  currentScore = 0; // sets no current score although not needed
  player0El.classList.toggle('player--active'); // turns on or off overlay to active player section
  player1El.classList.toggle('player--active'); // if player had the overlay it is now turned off and vice versa
};

// rolling dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // generate random dice number
    diceEl.classList.remove('hidden'); // begin showing dice png
    diceEl.src = `dice-${dice}.png`; // show correct dice depending on random number generated
    if (dice !== 1) {
      // checking to make sure the dice doesnt equal 1
      currentScore += dice; // adding dice to current score
      document.getElementById(`current--${activePlayer}`).innerHTML =
        currentScore; // updating the active players current score
    } else {
      // factoring in if the active player rolls a 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // adding respective players current score to locked in score -- scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).innerHTML =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  newGame();
});
