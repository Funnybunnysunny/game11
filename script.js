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
        resetGame(); // Reset the game and keep the loop going
    } else {
        setTimeout(() => {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            gameLoop(); // Continue the loop
        }, 100);
    }
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
    } else if (key === 40 && dy === 0) { // down arrow
        dx = 0;
        dy = 1;
    }
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvasSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvasSize;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function resetGame() {
    // Reset snake position, size, direction, and score
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    food = spawnFood(); // Respawn food
    // Continue the game loop after reset
    clearCanvas();
    drawSnake();
    drawFood();
}

// Start the game loop when the page loads
gameLoop();
