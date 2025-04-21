const canvas = document.getElementsByClassName("snake")[0];
const ctx = canvas.getContext("2d");
let highScore = Number(localStorage.getItem("highScore"));
let dirChanged = false;
let sWidth = 20;
let sHeight = 20;
let aRadius = 10;
let newHS = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let score = 0;
let sKey;
let paused = false;
let x = 100;
let y = canvas.height / 2 - sHeight / 2;
let snake = [{x:x, y:y}];
let ax = canvas.width / sWidth * 0.75 * 20;
let ay = canvas.height / 2;
function drawApple() {
    ctx.beginPath();
    ctx.arc(ax, ay, aRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}
function drawSnake() {
    for (i = 0; i < score + 1; i++) {
        ctx.beginPath();
        ctx.rect(snake[i].x, snake[i].y, sWidth, sHeight);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        ctx.closePath();
    }
}
function aReset() {
    ax = (Math.floor(Math.random() * (canvas.width / sWidth)) + 1) * 20 - 10;
    ay = (Math.floor(Math.random() * (canvas.height / sHeight)) + 1) * 20 - 10; 
}
function draw() {
    dirChanged = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    // movement
    sKey = undefined;
    if (moveUp) {
        y -= sHeight;
    }
    if (moveDown) {
        y += sHeight;
    }
    if (moveLeft) {
        x -= sWidth;
    }
    if (moveRight) {
        x += sWidth;
    }
    // add collision
    for (i = snake.length + 1; i > 0; i--) {
        if (i > 450) {
            continue;
        }
        snake[i] = snake[i - 1];
    }
    snake[0] = {x:x, y:y};
    // death handling/messages
    if (x < 0 || x > canvas.width - sWidth || y < 0 || y == canvas.height) {
        setTimeout(die, 10);
        function die() {
            if (score > highScore) {
                newHS = true;
                highScore = score;
                localStorage.setItem("highScore", String(score));
                alert("GAME OVER\nNEW HIGH SCORE: " + String(score));
            } else {
                alert("GAME OVER\nScore: " + String(score) + "\nHigh Score: " + String(highScore));
            }
            document.location.reload();
            clearInterval(interval);
        }
    }
    // apple collision
    if (ax - sWidth / 2 == x && ay - sHeight / 2 == y) {
        aReset();
        score++;
    }
}
document.addEventListener("keydown", keyDownManager, false);
// fix caps input
function keyDownManager(e) {
    if (!paused) {
        if (sKey != undefined) {
            e.key = sKey;
        }
        if (e.key == "Up" && !moveDown && !dirChanged || e.key == "w" && !moveDown && !dirChanged || e.key == "ArrowUp" && !moveDown && !dirChanged) {
            moveUp = true;
            moveDown = false;
            moveLeft = false;
            moveRight = false;
            dirChanged = true;
        }
        if (e.key == "Down" || e.key == "s" && !moveUp && !dirChanged || e.key == "ArrowDown" && !moveUp && !dirChanged) {
            moveDown = true;
            moveUp = false;
            moveLeft = false;
            moveRight = false;
            dirChanged = true;
        }
        if (e.key == "Left" || e.key == "a" && !moveRight && !dirChanged || e.key == "ArrowLeft" && !moveRight && !dirChanged) {
            moveLeft = true;
            moveDown = false;
            moveUp = false;
            moveRight = false;
            dirChanged = true;
        }
        if (e.key == "Right" || e.key == "d" && !moveLeft && !dirChanged || e.key == "ArrowRight" && !moveLeft && !dirChanged) {
            moveRight = true;
            moveDown = false;
            moveLeft = false;
            moveUp = false;
            dirChanged = true;
        }
        if (dirChanged) {
            sKey = e.key;
        }
    }
    if (e.key == "Escape") {
        if (paused) {
            interval = setInterval(draw, 100)
            paused = false;
        } else {
            clearInterval(interval);
            paused = true;
        }
    }
}
interval = setInterval(draw, 100);