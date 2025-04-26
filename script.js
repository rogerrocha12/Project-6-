const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again-btn');

let gameEnded = false;
let seconds = 0;
let score = 0;
let selectedInsect = {};
let timeLeft = 20;
let countdownInterval;


startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedInsect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function startGame() {
    updateTimeDisplay(); // Show initial time
    countdownInterval = setInterval(decreaseTime, 1000);
}

function endGame() {
    if (gameEnded) return; // prevent it from running again
    gameEnded = true;

    alert(`Game Over! Your score is: ${score}`);
    playAgainBtn.style.display = 'block';
}



function decreaseTime() {
    timeLeft--;
    updateTimeDisplay();

    if (timeLeft <= 0) {
        clearInterval(countdownInterval); // Just in case
        endGame(); // End the game
    }
}

function updateTimeDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;

}


function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore() {
    score++;
 
    scoreEl.innerHTML = `Score: ${score}`;
}


playAgainBtn.addEventListener('click', () => {
    // Reset everything
    gameEnded = false;
    score = 0;
    timeLeft = 20;
    scoreEl.innerHTML = `Score: ${score}`;
    message.classList.remove('visible');
    playAgainBtn.style.display = 'none';

    // Remove all insects
    document.querySelectorAll('.insect').forEach(insect => insect.remove());

    // Restart the game
    updateTimeDisplay();
    countdownInterval = setInterval(decreaseTime, 1000);
    setTimeout(endGame, 20000);
    setTimeout(createInsect, 1000);
});
 