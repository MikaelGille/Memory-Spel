const images = [
    'img/img1.jpg', 'img/img1.jpg',
    'img/img2.jpg', 'img/img2.jpg',
    'img/img3.jpg', 'img/img3.jpg',
    'img/img4.jpg', 'img/img4.jpg',
    'img/img5.jpg', 'img/img5.jpg',
    'img/img6.jpg', 'img/img6.jpg'
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let gameTime = 60;

const cards = Array.from(document.getElementsByClassName("card"));
const timeSelector = document.getElementById("time");
const resetButton = document.getElementById("reset-button");
const flips = document.querySelector('.flips');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function assignImages() {
    shuffle(images);
    cards.forEach((card, index) => {
        const frontView = card.querySelector(".view.front-view");
        const backView = card.querySelector(".view.back-view");
        card.classList.remove('flip');
        frontView.innerHTML = `<img src="img/qmark.png" alt="Frågetecken">`;
        backView.innerHTML = `<img src="${images[index]}" alt="Bild">`;
    });
}

function match() {
    moves++;
    flips.innerText = `Antal: ${moves}`;

    const [firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.querySelector('.back-view img').src;
    const secondImage = secondCard.querySelector('.back-view img').src;

    if (firstImage === secondImage) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    const timerDisplay = document.querySelector('.details .timer');
    let remainingTime = gameTime;
    timerDisplay.innerText = `Tid: ${remainingTime}s`;

    timer = setInterval(() => {
        remainingTime--;
        timerDisplay.innerText = `Tid: ${remainingTime}s`;
        if (remainingTime === 0) {
            clearInterval(timer);
            alert('Tiden är slut!');
        }
    }, 1000);
}

resetButton.addEventListener('click', () => {
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    flips.innerText = `Antal: ${moves}`;
    clearInterval(timer);
    gameTime = parseInt(timeSelector.value, 10);
    startTimer();
    assignImages();
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flip') && !matchedCards.includes(card)) {
            card.classList.add('flip');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                match();    
            }
        }
    });
});