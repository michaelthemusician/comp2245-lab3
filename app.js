const fruits = [
{ name: "apple", symbol: "🍎" },
{ name: "banana", symbol: "🍌" },
{ name: "cherry", symbol: "🍒" },
{ name: "coconut", symbol: "🥥" },
{ name: "grapes", symbol: "🍇" },
{ name: "mango", symbol: "🥭" },
{ name: "pineapple", symbol: "🍍" },
{ name: "watermelon", symbol: "🍉" },
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



//the elements on the page
const board = document.querySelector("#board");
const statusMessage = document.querySelector("#status");
const moveCounter = document.querySelector("#moves");
const newGameButton = document.querySelector("#new-game"); //check the id in index.html




//current state of the game
let deck = [];
let turned = []; //the cards face up
let moves = 0;
let waiting = false; //true while two wrong cards are showing
let turnBackTimer = null; //the id of the pending timer, used in Exercise 6



function buildBoard() {
    //every fruit twice = 16 cards, shuffled
    deck = shuffle([...fruits, ...fruits]);

    deck.forEach((fruit, i) => {
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("card");
        card.setAttribute("aria-label", `Card ${i + 1}, face down`);
        card.dataset.index = i; //remembers which fruit this card is
        board.appendChild(card);
    });
}


function cardNumber(card) {
    return Number(card.dataset.index) + 1;
}

function flipCard(card) {
    const fruit = deck[card.dataset.index];
    card.textContent = fruit.symbol;
    card.classList.add("flipped");
    card.setAttribute("aria-label", `Card ${cardNumber(card)}, ${fruit.name}`);
    turned.push(card);

    if (turned.length === 2) {
        checkForMatch();
    }
}

function turnBack(card) {
    card.textContent = "";
    card.classList.remove("flipped");
    card.setAttribute("aria-label", `Card ${cardNumber(card)}, face down`);
}


function showMoves() {
    moveCounter.textContent = String(moves);
}

function checkForMatch() {
    const [first, second] = turned;

    moves++;
    showMoves();

    const sameFruit =
    deck[first.dataset.index].name === deck[second.dataset.index].name;

    if (sameFruit) {
        first.classList.add("matched");
        second.classList.add("matched");
        first.disabled = true;
        second.disabled = true;
        statusMessage.textContent = "That's a pair!";
        turned = [];
    } else {
        statusMessage.textContent = "Not a pair. Try again.";
        waiting = true;
        turnBackTimer = setTimeout(() => {
            turnBack(first);
            turnBack(second);
            turned = [];
            waiting = false;
        }, 1000);
    }
}

board.addEventListener("click", (event) => {
    if (waiting) return; // new

    const card = event.target;
    if (!card.classList.contains("card")) return;
    if (card.classList.contains("flipped")) return;

    flipCard(card);
});

buildBoard();
