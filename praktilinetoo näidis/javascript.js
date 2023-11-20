// Kaartide andme-elemendid
let cards = [];

for (let i = 1; i <= 15; i++) {
    let card = {
      icon: `../assets/picture${i}.png`,
      id: i
    };
    cards.push(card);
    cards.push({ ...card });
  }

  // Kaartide segamine Fisher-Yatesi algoritmiga
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let shuffledArray = shuffleArray(cards);

  // Kaardi HTML
function createCard(card) {
    return `
      <img onclick="showPicture(this)" data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
    `;
  }

  // massiiv paaris kaartide jaoks
  let pairs = [];

  // Mängu loogika

  let card1 = null;
  let card2 = null;
  
  function showPicture(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
  
    if (!card1) {
      card1 = element;
    } else {
      card2 = element;
      let result = checkCard(card1, card2);
      if (result) {
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
        }, 500);
      }
    }
  
    element = null;
  }
  
  // Kaardi kontrollfunktsioon
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

  // Kaardid ruudustikku
function displayCards() {
    let outputElement = document.querySelector(".grid-container");
    for (let i = 0; i < cards.length; i++) {
      let cardElement = document.createElement("div");
      cardElement.innerHTML = createCard(cards[i]);
      cardElement.classList.add("cardbody");
      outputElement.appendChild(cardElement);
    }
  }
  
  displayCards();