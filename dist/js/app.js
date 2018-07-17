// Handler when the DOM is fully loaded
let open = [];
let matchedCards = [];
let moves = 0;
let move = 0;
let openCards = [];
const icons = [
  'diamond',
  'diamond'
  // 'paper-plane-o',
  // 'anchor',
  // 'bolt',
  // 'cube',
  // 'anchor',
  // 'leaf',
  // 'bicycle',
  // 'diamond',
  // 'bomb',
  // 'leaf',
  // 'bomb',
  // 'bolt',
  // 'bicycle',
  // 'paper-plane-o',
  // 'cube',
];


document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", restartGame);



function startGame() {
document.getElementById("timer").style.display = "block";

  startTimer();
  document.getElementById("start-btn").remove();
  document.getElementById('score-panel-container').innerHTML = '<section class="score-panel"><ul class="stars"><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li></ul><span class="moves" id="moves"></span> Moves <div id="refresh-btn" class="restart"><i class="fa fa-repeat"></i></div></section><ul class="deck" id="deck"></ul>'
  populateCards(icons)
  document.addEventListener('click', listen, false);
  //document.getElementById("refresh-btn").addEventListener("click", restartGame);
}

function restartGame() {

  let open = [];
  matchedCards = [];
  let move = 0;
  document.getElementById("timer").innerHTML = '';
  modal.style.display = "none";

  startTimer();
  document.getElementById('score-panel-container').innerHTML = '<section class="score-panel"><ul class="stars"><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li></ul><span class="moves" id="moves"></span> Moves <div id="refresh-btn" class="restart"><i class="fa fa-repeat"></i></div></section><ul class="deck" id="deck"></ul>'
  populateCards(icons)
  document.addEventListener('click', listen, false);
  //document.getElementById("refresh-btn").addEventListener("click", restartGame);
}

/*
 * Create a list that holds all of your cards
 */


function populateCards(icons) {
  shuffle(icons);
  let array = [];
  for (i = 0; i < icons.length; i++) {
    array.push('<li class="card" type="' + icons[i] + '"><i class="fa fa-' + icons[i] + '"></i></li>');
  }
  document.getElementById('deck').innerHTML = (array.join(""));
}


function listen(event) {
  if ((event.target.classList.contains('match')) || (event.target.classList.contains('show'))) {
    //do nothing
  } else if (event.target.classList.contains('card')) {
    const card = event.target;
    showSymbol(card);
    checkMatch(card);
    completeGame();


  } else {
    //do nothing
  }

}

//start timer


function startTimer() {

  const timer = document.getElementById('timer');
  const start = Date.now();
  interval = setInterval(function() {
    const delta = Date.now() - start; // milliseconds elapsed since start
    let elapsedTime = (Math.floor(delta / 1000));

    timer.innerHTML = elapsedTime + ' seconds';
    if (elapsedTime > 59) {
      let test = ((Math.floor(elapsedTime / 60)) * 60);
      let minutes = (Math.floor(elapsedTime / 60));
      let seconds = (elapsedTime - test);
      timer.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
    }
  }, 100);

}

//end timer


function starRating(counter) {
  let array = document.getElementsByClassName('fa-star');
  if (counter === 10) {
    array[0].remove();
  } else if (counter === 5) {
    array[1].remove();
  } else if (counter === 2) {
    array[2].remove();
  }
  return array.length;
}

function showSymbol(card) {
  card.classList.add('open', 'show');
}

function checkMatch(card) {
  open.push(card);
  let length = open.length;

  if (length < 2) {
    //do nothing
  } else if (length === 2) {


    move = ++move;
    document.getElementById("moves").innerHTML = move;
    starRating(move)

    if (open[0].type == open[1].type) {
      removeClass(open[0], open[1]);
      open[0].classList.add('match');
      open[1].classList.add('match');
      matchedCards.push(open[0]);
      matchedCards.push(open[1]);
      open.splice(0, 2);
    } else {}

  } else {
    removeClass(open[0], open[1]);
    open.splice(0, 2)

  }
}

function removeClass(index0, index1) {
  index0.classList.remove('show', 'open');
  index1.classList.remove('show', 'open');
}

function completeGame() {

  if (matchedCards.length === 2) {
    //let finalTime = d
    clearInterval(interval);


    const deck = document.getElementById('deck');
    deck.remove();

    timer.style.display = "none";
    displayModal();
    printScore();
    move = 0;
    matchedCards = [];

  } else {}
}





// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks on the button, open the modal
function displayModal() {
  modal.style.display = "block";
}



function printScore() {
  document.getElementById('finalTime').innerHTML = timer.innerHTML;
  document.getElementById('finalMove').innerHTML = move;
  let rating = '';
  for (i = 0; i < starRating(); i++) {
    rating += '<li><i class="fa fa-star"></i></li>';
  }
  document.getElementById('finalStar').innerHTML = rating;
}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
