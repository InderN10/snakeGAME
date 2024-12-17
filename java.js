const board = document.querySelector("#board");
const context = board.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
// const boardX = board.width;
// const boardY = board.Height;
const background = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let velocityX = unitSize;
let velocityY = 0;
let foodX;
let foodY;
let score = 0;
let boardX = 500;
let boardY = 500;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

const backgroundImage = new Image();
backgroundImage.src = 'image/background.jpg';

// Initialize sounds
let eatFoodSound = new Audio('assets/sound/eatsound.mp3');
let gameOverSound = new Audio('assets/sound/gameover.mp3');
let moveSnakeSound = new Audio('assets/sound/moveSnake.mp3');
let backgroundMusic = new Audio('assets/sound/backmusic.mp3');

// Set background music to loop
backgroundMusic.loop = true;

// Play background music when the game starts
function playBackgroundMusic() {
    backgroundMusic.play();
}

// Stop background music when the game ends
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset the music to the beginning
}



window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);
gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    // clearBoard()
    createFood();
    drawFood();
    playBackgroundMusic();
    nextTick();

};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 90)
    }
    else {
        displayGameOver();
        stopBackgroundMusic();
    }
};
function clearBoard() {
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);
    // context.fillStyle = background;
    // context.fillRect(0, 0, boardX, boardY)
};
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum;
    }
    foodX = randomFood(0, boardX - unitSize)
    foodY = randomFood(0, boardX - unitSize)
    console.log(foodX);

};
function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);

};
function moveSnake() {
    const head = {
        x: snake[0].x + velocityX,
        y: snake[0].y + velocityY
    };

    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
        eatFoodSound.play();
    } else {
        // console.log('before', snake)
        snake.pop();
        // console.log('sajidoa', snake)
    }
};
function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        // console.log(snakePart)
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (velocityY == -unitSize);
    const goingDown = (velocityY == unitSize);
    const goingRight = (velocityX == unitSize);
    const goingLeft = (velocityX == -unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
            velocityX = -unitSize;
            velocityY = 0;
            moveSnakeSound.play();
            break;
        case (keyPressed == UP && !goingDown):
            velocityX = 0;
            velocityY = -unitSize;
            moveSnakeSound.play();
            break;
        case (keyPressed == RIGHT && !goingLeft):
            velocityX = unitSize;
            velocityY = 0;
            moveSnakeSound.play();
            break;
        case (keyPressed == DOWN && !goingUp):
            velocityX = 0;
            velocityY = unitSize;
            moveSnakeSound.play();
            break;
    }
};
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= boardX):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= boardY):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false
        }
    }
};
function displayGameOver() {
    gameOverSound.play();
    // window.alert("azgui amitan!")
    context.font = "50px";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText = ("GAME OVER!", boardX / 2, boardY / 2);
    running = false
    console.log("hello");
};
function resetGame() {
    score = 0;
    velocityX = unitSize;
    velocityY = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart()
};