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
let x = 100;
let y = (canvas.height / 2) - sHeight / 2;
let ax = (canvas.width / 20) / 4 * 3 * 20;
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
function aReset() {
    ax = (Math.floor(Math.random() * (canvas.width / sWidth)) + 1) * 20 + 10;
    ay = (Math.floor(Math.random() * (canvas.height / sHeight)) + 1) * 20 + 10; 
}
function draw() {
    dirChanged = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    // movement
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
// prevent 2 keypresses in 1 frame
function keyDownManager(e) {
    if (e.key == "Up" && !moveDown && !dirChanged || e.key == "w" && !moveDown && !dirChanged || e.key == "ArrowUp" && !moveDown && !dirChanged) {
        moveUp = true;
        moveDown = false;
        moveLeft = false;
        moveRight = false;
        dirChanged = true
    }
    if (e.key == "Down" || e.key == "s" && !moveUp && !dirChanged || e.key == "ArrowDown" && !moveUp && !dirChanged) {
        moveDown = true;
        moveUp = false;
        moveLeft = false;
        moveRight = false;
        dirChanged = true
    }
    if (e.key == "Left" || e.key == "a" && !moveRight && !dirChanged || e.key == "ArrowLeft" && !moveRight && !dirChanged) {
        moveLeft = true;
        moveDown = false;
        moveUp = false;
        moveRight = false;
        dirChanged = true
    }
    if (e.key == "Right" || e.key == "d" && !moveLeft && !dirChanged || e.key == "ArrowRight" && !moveLeft && !dirChanged) {
        moveRight = true;
        moveDown = false;
        moveLeft = false;
        moveUp = false;
        dirChanged = true
    }
}
interval = setInterval(draw, 100);