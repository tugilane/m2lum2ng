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
      <img data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
    `;
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