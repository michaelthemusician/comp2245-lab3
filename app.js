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

function flipCard(card) {
    const fruit = deck[card.dataset.index];
    card.textContent = fruit.symbol;
    card.classList.add("flipped");
    card.setAttribute("aria-label", `Card ${card.dataset.index}, ${fruit.name}`);
    turned.push(card);
}

board.addEventListener("click", (event) => {
    const card = event.target;

    // Ignore clicks on the gaps between cards
    if (!card.classList.contains("card")) return;

    // A face-up card can't be turned again
    if (card.classList.contains("flipped")) return;

    flipCard(card);
});

buildBoard();
