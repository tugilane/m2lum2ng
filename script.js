let cards = [];
let pairs = [];

// creating the pairs 
for (let i = 1; i <= 24; i++) {
  let card = {
    icon: `./assets/picture${i}.png`,
    id: i
  };
  cards.push(card);
  cards.push({ ...card });
}

// Shuffling the cards with Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledArray = shuffleArray(cards);
console.log(shuffledArray);

// Creating card HTML
function createCard(card) {
  return `
    <img onclick="showPicture(this)" data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
  `;
}

// Game logic
let card1 = null;
let card2 = null;

function showPicture(element) {
  if (element.getAttribute("data-pairMatch") === "match") {
    return;
  }

  element.classList.remove('hidden');
  element.classList.add('visible');

  if (!card1) {
    card1 = element;
  } else {
    card2 = element;
    let result = checkCard(card1, card2);
    if (result) {
      // alert match
      showNotification()
      card1 = null;
      card2 = null;
    } else {
      setTimeout(function() { 
        if (card1 !== null && card2 !== null) {
          card1.classList.remove('visible');
          card1.classList.add('hidden');
          card2.classList.remove('visible');
          card2.classList.add('hidden');
          card1 = null;
          card2 = null;
        }
      }, 300);
    }
  }

  element = null;
}

// Check for a pair function
function checkCard(card1, card2) {
  if (card1.getAttribute("data-pairId") === card2.getAttribute("data-pairId")) {
    card1.dataset.pairMatch = "match";
    card2.dataset.pairMatch = "match";
    card1.removeAttribute("onclick");
    card2.removeAttribute("onclick");
    pairs.push(card1);
    pairs.push(card2);
    console.log(pairs)
    return true;
  } else {
    return false;
  }
} 

// show text when pair found
let notification1 = document.getElementById("notification"); 
function showNotification(){
 if (pairs.length === 48 ) {
  notification1.textContent = "Palju Õnne, võitsid mängu!!!";
  notification1.classList.remove('hidden')
  notification1.classList.add('visible')
 } else {
  notification1.classList.remove('hidden')
  notification1.classList.add('visible')
  setTimeout(function() {
      notification1.classList.remove('visible');
      notification1.classList.add('hidden');
  }, 1000);
}
}

// Display the cards
function displayCards() {
  let outputElement = document.querySelector(".grid-container");
  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.createElement("div");
    cardElement.innerHTML = createCard(cards[i]);
    cardElement.classList.add("card");
    outputElement.appendChild(cardElement);
  }
}

displayCards();

 


