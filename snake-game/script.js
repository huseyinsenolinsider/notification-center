//Define HTML elements
const gameBoard = document.getElementById('game-board');
const isntructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScore = document.getElementById('high-score');

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameSpeed = 100;
let gameStarted = false;
let gameInterval;
let currentScore;
let directionQueue = ['right'];

//Draw game map, snake, food
function draw() {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
};

//Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        gameBoard.appendChild(snakeElement);
    });
};

//Create a snake or food
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

//Set the position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

};

//Draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        gameBoard.appendChild(foodElement);
    };
};

//Generate food
function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    let regenerateFood = true;

    while (regenerateFood) {
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === x && snake[i].y === y) {
                x = Math.floor(Math.random() * gridSize) + 1;
                y = Math.floor(Math.random() * gridSize) + 1;
                regenerateFood = true;
            } else {
                regenerateFood = false
            };
        };
    };

    return { x, y };
};

//Moving the snake
function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'right': head.x++;
            break;
        case 'left': head.x--;
            break;
        case 'up': head.y--;
            break;
        case 'down': head.y++;
            break;
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        updateScore();
    }
    else {
        snake.pop();
    };
};

//Eating food
function eat() {
    if (snake[0] == food) { }
}

//Starting the game
function startGame() {
    gameStarted = true;
    isntructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeed);
    currentScore = 0;
};

function handleKeyPress(e) {
    if (!gameStarted && e.key === ' ') {
        startGame();
    }

    else {
        switch (e.key) {
            case 'ArrowRight': if (direction != 'left') direction = 'right';
                break;
            case 'ArrowLeft': if (direction != 'right') direction = 'left';
                break;
            case 'ArrowUp': if (direction != 'down') direction = 'up';
                break;
            case 'ArrowDown': if (direction != 'up') direction = 'down';
                break;
        };
    }

};

document.addEventListener('keydown', handleKeyPress);

function checkCollision() {
    const head = snake[0];
    if (head.x <= 0 || head.x > gridSize || head.y <= 0 || head.y > gridSize) {
        resetGame();
    };

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
};

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = 'right';
    currentScore = 0;
    score.textContent = (currentScore).toString().padStart(3, '0');
};

function updateHighScore() {
    const lastScore = (snake.length - 1).toString().padStart(3, '0');
    if (lastScore > highScore.textContent) {
        highScore.textContent = lastScore;
    };
};

function updateScore() {
    score.textContent = (currentScore + 1).toString().padStart(3, '0');
    currentScore++;
};

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    isntructionText.style.display = 'block';
    logo.style.display = 'block';
};
