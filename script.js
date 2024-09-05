document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));
let cards = [];
let pairs = [];

// Loon paaris kaartide elemendid
for (let i = 1; i <= 15; i++) {
  let card = {
    icon: `./assets/picture${i}.png`,
    id: i
  };
  cards.push(card);
  cards.push({ ...card });
}

// Segan kaartide elemendid Fisher-Yates'i segamise algoritmiga
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledArray = shuffleArray(cards);
console.log(shuffledArray);

// Loon kaardi HTML koodi, kaardi struktuuri jaoks
function createCard(card) {
  return `
    <img onclick="showPicture(this)" data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
  `;
}

// Mänguloogika

  let card1 = null;
  let card2 = null;
  // Funktsioon kaardi nähtavale toomiseks
  function showPicture(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
    // Kui kaart 1 pole määratud, vajutatu = kaart1 else kaart 2.
    // Kui mõlemad kaardid määratud siis aktiveerub paarikontroll
    if (!card1) {
      card1 = element;
    } else {
      card2 = element;
      let result = checkCard(card1, card2);
      // Näitab teadet kui leiti paar. Tühjendab kaart1 ja kaart2 muutujad, kui polnud kaartide paar siis timer ja haihtub
      if (result) {
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
        }, 500);
      }
    }

    element = null;
  }

  // Paarikontroll. pmst kui paar leitud: võrdled kaartide datat ja lisad datat ja kaotad vajutamise funkstiooni ja lisad leitud paaride nimekirja
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

// Teated. pmst kui paaride nimekiri fullis ütleb, et võitsid. Kui leiad ns paari siis toob teise teate nähtavale ja peidab taimeriga
let notification1 = document.getElementById("notification"); 
function showNotification(){
 if (pairs.length === 30 ) {
  notification1.textContent = "Palju Õnne, võitsid mängu!";
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

// Sisestab HTML ja kaartide andme elementidest kaardid, index faili div sisse 
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

 


