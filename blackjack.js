useVar = {}; // Used to store resetting variables after game ends
// let data = undefined;
// let dataUrl = undefined;
// Score Calculation Variables
let delearSum = 0;
let add = 0;

// Cards variables
let hiddenCard = undefined;
let firstCard = undefined;
let firstCardDetails = undefined;
let card = undefined;

// Loading functions on load of website
window.onload = function () {
  resettingVaraibales();
  if (sessionStorage.length > 1) {
    startGame();
  } else {
    storingImgs();
  }
  // setTimeout(startGame, 900);
};

// Function for creating and resetting variables to there orignal values
function resettingVaraibales() {
  let shuffleDeck = deckCreaction(); // Deck Creation Variables
  let aceCount = 0;
  let yourSum = 0; // To store user score
  let count = 0; // Result output variable
  return (useVar = { shuffleDeck, aceCount, yourSum, count });
}

function storingImgs() {
  // checkForComplition = false;
  for (i = 0; i < useVar.shuffleDeck.length; i++) {
    let sessionKey = useVar.shuffleDeck[i];
    imagePath = "./cards/" + sessionKey + ".avif";
    toDataURL(imagePath, function (dataURL) {
      sessionStorage.setItem(sessionKey, dataURL);
    });
    if (i == 0) {
      backImagePath = "./cards/BACK.avif";
      toDataURL(backImagePath, function (dataURL) {
        sessionStorage.setItem("back-img", dataURL);
      });
    }
  }
  setTimeout(startGame, 1000);

  // for (p = 0; p < 1; ) {
  //   console.log("inside for loop");
  //   if (sessionStorage.length > 51) {
  //     console.log("inside if statement");
  //     startGame();
  //     p++;
  //   } else {
  //     console.log("inside else");
  //     setTimeout(1000);
  //   }
  // }

  // if (sessionStorage.length > 52) {
  //   startGame();
  // }
}

function toDataURL(src, callback) {
  let image = new Image();
  image.crossOrigin = "Anonymous";
  image.onload = function () {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    context.drawImage(this, 0, 0);
    let dataURL = canvas.toDataURL("image/jpeg");
    callback(dataURL);
  };
  image.src = src;
}

// Deck creation and shuffelling function
function deckCreaction() {
  let types = ["H", "C", "S", "D"];
  let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  let deck = [];
  let newPosition;
  let tempCardStore;

  // Creating a deck of cards
  for (i = 0; i < types.length; i++) {
    for (j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }

  // Shuffling the deck of cards
  for (i = deck.length - 1; i > 0; i--) {
    newPosition = Math.floor(Math.random() * (i + 1));
    tempCardStore = deck[i];
    deck[i] = deck[newPosition];
    deck[newPosition] = tempCardStore;
  }
  return deck;
}

// Starting the game
function startGame() {
  backCard = "back-img";
  // Creating first display back card
  let backImg = document.createElement("img");
  backImg.src = sessionStorage.getItem(backCard);
  backImg.id = "hidden";
  backImg.alt = "Flipped-Card";
  document.getElementById("dealer-cards").append(backImg);

  // Providing the first card of deck to dealer witch shall be hidden and storing it sapretly so it can be used latter
  firstCard = useVar.shuffleDeck.shift();
  firstCardDetails = cardType(firstCard);

  // Storing the value of first card in Dealers Score
  delearSum = cardValues(firstCard);

  // Giving delear more cards on condition
  for (delearSum; delearSum < 17; ) {
    card = cardDisplay("dealer-cards");

    // Getting the value of card
    add = cardValues(card);

    // Adding the valur of card to dealerSum
    delearSum += add;

    // Checking if delears total acceeds 21 limit and if there is ace present then reducing the ace value to 1 and altering dealerSum accordinly
    if (delearSum > 21) {
      delearSum = delearSum - useVar.aceCount * 10;
      useVar.aceCount = 0;
    }
  }

  //Setting aceCount to 0 so it can futher be ussed for user
  useVar.aceCount = 0;
  add = 0;

  // Providing user first two cards
  for (i = 0; i < 2; i++) {
    card = cardDisplay("your-cards");

    // Getting value of cards
    add = cardValues(card);

    // Adding card Value to youSum and if ace card and incrementing the ace count
    useVar.yourSum += add;
  }

  // Getting window Items
  hiddenCard = document.getElementById("hidden");
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("restartGame").addEventListener("click", restartGame);
}

function hit() {
  if (useVar.count > 0) {
    msg();
  } else if (useVar.yourSum <= 21) {
    card = cardDisplay("your-cards");

    // Getting value of cards
    add = cardValues(card);

    // Adding card Value to youSum
    useVar.yourSum += add;
  }

  //checking for acecount and if available then reducing it and if not then displaying the result it self
  if (useVar.yourSum > 21 && useVar.aceCount > 0) {
    useVar.yourSum = useVar.yourSum - useVar.aceCount * 10;
    useVar.aceCount = 0;
  } else if (useVar.yourSum > 21) {
    result();
    hiddenCard.src = sessionStorage.getItem(firstCard);
    hiddenCard.alt =
      firstCardDetails[0] + "-of-" + firstCardDetails[1] + "-img";
  }
}

function stay() {
  if (useVar.count > 0) {
    msg();
  } else {
    result();
    hiddenCard.src = sessionStorage.getItem(firstCard);
    hiddenCard.alt =
      firstCardDetails[0] + "-of-" + firstCardDetails[1] + "-img";
  }
}

// For getting card value
function cardValues(cardForSplit) {
  let cardSplit;
  let sum = 0;
  cardSplit = cardForSplit.split("-");
  if (cardSplit[0] == "A") {
    useVar.aceCount++;
    sum = 11;
  } else if (isNaN(cardSplit[0])) {
    sum = 10;
  } else {
    sum = parseInt(cardSplit[0]);
  }
  return sum;
}

//For sending the card image to Window
function cardDisplay(user) {
  let cardDetails = undefined;
  card = useVar.shuffleDeck.shift();
  cardDetails = cardType(card);
  let cardImg = document.createElement("img");
  cardImg.src = sessionStorage.getItem(card);
  cardImg.alt = cardDetails[0] + "-of-" + cardDetails[1] + "-img";
  document.getElementById(user).append(cardImg);
  return card;
}

// Result update function
function result() {
  document.getElementById("dealer-sum").innerHTML = delearSum;
  document.getElementById("your-sum").innerHTML = useVar.yourSum;
  if (useVar.yourSum > 21) {
    document.getElementById("results").innerHTML = "You lost the game";
    useVar.count = 1;
  } else if (delearSum == useVar.yourSum) {
    document.getElementById("results").innerHTML = "Its a draw";
    useVar.count = 2;
  } else if (useVar.yourSum > delearSum || delearSum > 21) {
    document.getElementById("results").innerHTML = "You win the game";
    useVar.count = 3;
  } else {
    document.getElementById("results").innerHTML = "You lost the game";
    useVar.count = 1;
  }
}

function msg() {
  if (useVar.count == 1) {
    alert("You already lost the game, please play agian");
    restartGame();
  } else if (useVar.count == 2) {
    alert("The game was a draw, please play agian");
    restartGame();
  } else if (useVar.count == 3) {
    alert("You already won the game, please play agian");
    restartGame();
  }
}

function restartGame() {
  resettingVaraibales(); // Reseting required the variables

  // Resting all the HTML Elments
  document.getElementById("dealer-cards").innerHTML = "";
  document.getElementById("your-cards").innerHTML = "";
  document.getElementById("dealer-sum").innerHTML = "";
  document.getElementById("your-sum").innerHTML = "";
  document.getElementById("results").innerHTML = "";

  startGame(); // Calling for start Game function to provide cards again
}

function cardType(cardForDetails) {
  let typeofCard;
  let cardNumer;
  cardSpliter = cardForDetails.split("-");
  for (k = 0; k < 4; k++) {
    if (cardSpliter[1] == "H") {
      typeofCard = "Hearts";
      cardNumer = cardSpliter[0];
    } else if (cardSpliter[1] == "C") {
      typeofCard = "Clubs";
      cardNumer = cardSpliter[0];
    } else if (cardSpliter[1] == "S") {
      typeofCard = "Spades";
      cardNumer = cardSpliter[0];
    } else {
      typeofCard = "Diamonds";
      cardNumer = cardSpliter[0];
    }
  }
  return [cardNumer, typeofCard];
}
