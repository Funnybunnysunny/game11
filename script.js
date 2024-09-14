const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of snake and food
const canvasSize = canvas.width / box; // canvas grid size
let snake = [{ x: 10, y: 10 }]; // initial snake
let food = spawnFood();
let dx = 0;
let dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    if (didGameEnd()) {
        alert("Game Over!"); // Alert the player that the game has ended
        return; // Stop the game loop
    }

    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x * box, segment.y * box, box, box));
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * canvasSize),
        y: Math.floor(Math.random() * canvasSize),
    };
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && dx === 0) { // left arrow
        dx = -1;
        dy = 0;
    } else if (key === 38 && dy === 0) { // up arrow
        dx = 0;
        dy = -1;
    } else if (key === 39 && dx === 0) { // right arrow
        dx = 1;
        dy = 0;
    } else if (key === 40 && dy === 0) { // d
