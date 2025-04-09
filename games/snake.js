const canvas = document.getElementsByClassName("snake")[0];
const ctx = canvas.getContext("2d");
let highScore = Number(localStorage.getItem("highScore"));
let sWidth = 20;
let sHeight = 20;
let aRadius = 10;
let score = 0;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let x = 100;
let y = (canvas.height / 2) - sHeight / 2;
let ax = canvas.width - (canvas.width - aRadius) / 4;
let ay = canvas.height / 2;
function drawApple() {
    ctx.beginPath();
    ctx.arc(ax, ay, aRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}
function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, sWidth, sHeight);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    // movement
    if (moveUp) {
        y -= 20;
    }
    if (moveDown) {
        y += 20;
    }
    if (moveLeft) {
        x -= 20;
    }
    if (moveRight) {
        x += 20;
    }
    // highscore handling
    if (x > ax && x < ax && y > ay && y < ay) {
        score += 1;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", String(score));
        }
    }
    // death handling
    if (x < 0 || x > canvas.width - sWidth || y < 0 || y == canvas.height) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
    // apple collision
    if () {
        score++;
    }
}
document.addEventListener("keydown", keyDownManager, false);
function keyDownManager(e) {
    if (e.key == "Up" || e.key == "w" && !moveDown || e.key == "ArrowUp" && !moveDown) {
        moveUp = true;
        moveDown = false;
        moveLeft = false;
        moveRight = false;
    }
    if (e.key == "Down" || e.key == "s" && !moveUp || e.key == "ArrowDown" && !moveUp) {
        moveDown = true;
        moveUp = false;
        moveLeft = false;
        moveRight = false;
    }
    if (e.key == "Left" || e.key == "a" && !moveRight || e.key == "ArrowLeft" && !moveRight) {
        moveLeft = true;
        moveDown = false;
        moveUp = false;
        moveRight = false;
    }
    if (e.key == "Right" || e.key == "d" && !moveLeft || e.key == "ArrowRight" && !moveLeft) {
        moveRight = true;
        moveDown = false;
        moveLeft = false;
        moveUp = false;
    }
}
interval = setInterval(draw, 100);