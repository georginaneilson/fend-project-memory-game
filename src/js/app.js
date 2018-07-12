// Handler when the DOM is fully loaded
let open = [];
let matchedCards = [];
let moves = 0;
let move = 0;


document.addEventListener("DOMContentLoaded", function() {
  let openCards = [];
  const icons = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'anchor',
    'leaf',
    'bicycle',
    'diamond',
    'bomb',
    'leaf',
    'bomb',
    'bolt',
    'bicycle',
    'paper-plane-o',
    'cube',
  ];
  populateCards(icons)
});

document.addEventListener('click', listen, false);

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
3

function listen(event) {
  if ((event.target.classList.contains('match')) || (event.target.classList.contains('show'))) {
    //do nothing
  } else if (event.target.classList.contains('card')) {
    const card = event.target;
    showSymbol(card);
    checkMatch(card, matchedCards);
    completeGame(matchedCards);


  } else {
    //do nothing
  }

}

let countMove = (function () {
    let counter = 0;
    return function () {
      console.log('test')
      counter ++;
      starRating(counter);
       return counter}
})();

// function starRating(counter){
//   let array = document.getElementsByClassName('fa-star');
//   if (counter > 10) {
//     array[0].remove();
//   } else if (counter > 5){
//     array[1].remove();
//     //do nothing
//   } else if (counter > 2){
//     array[2].remove();
//   }
// }

function starRating(counter){
  let array = document.getElementsByClassName('fa-star');
  if (counter > 10) {
     array[0].remove();
   } else if (counter === 5){
     array[1].remove();
   } else if (counter === 2){
     array[2].remove();
   }
}

function showSymbol(card) {
  card.classList.add('open', 'show');
}

function checkMatch(card, array) {
  open.push(card);
  let length = open.length;

  if (length < 2) {
    //do nothing
  } else if (length === 2) {


    move = ++move;
    console.log('move = ' + move);
    starRating(move)

    if (open[0].type == open[1].type) {
      removeClass(open[0], open[1]);
      open[0].classList.add('match');
      open[1].classList.add('match');
      array.push(open[0]);
      array.push(open[1]);
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

function completeGame(array) {
  if (array.length === 16) {
    const deck = document.getElementById('deck');
    deck.remove();
  } else {}
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
