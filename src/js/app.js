// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log('ready');
  let cardList = [];
  const cardSymbol = [
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
  const cards = document.getElementsByClassName('card');


  createList(cardSymbol, cardList);
  shuffle(cardList);
  document.getElementById('deck').innerHTML = (cardList.join(""));
  addListener(cards);
  console.log(open);

});


/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName('card');
let open = [];
function createList(icons, htmlCards) {
  for (i = 0; i < icons.length; i++) {
    htmlCards.push('<li class="card"><i class="fa fa-' + icons[i] + '"></i></li>');
  }
}

function addListener(cards) {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', displaySymbol);

  }
}

function displaySymbol() {
  console.log('clicked')
  this.classList.add('open', 'show');
  openList(open);
};

function openList(array) {
  if (array.length >= 2){
    array.length = 0;
    removeClass(cards, 'show');
    removeClass(cards, 'open');
    array.push(this);
  } else {
  array.push(this);
}
  compare(array);
};

function compare(array) {
  console.log(array[0]);
  console.log(array[1]);
  if (array.length >= 2){
    if (array[0] === array[1]){
      console.log('match')
    } else {
      console.log('not a match')
    }
  } else {
    //removeClass(cards, 'show');
    //removeClass(cards, 'open');
  }
}

function removeClass(elements, myClass) {

  // if there are no elements, we're done
  if (!elements) { return; }

  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }

  // create pattern to find class name
  var reg = new RegExp('(^| )'+myClass+'($| )','g');

  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].className = elements[i].className.replace(reg,' ');
  }
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
