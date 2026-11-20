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
const newGameButton = document.querySelector("#new-game"); //scheck the id in index.html




//current state of the game
let deck = [];

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

buildBoard();
