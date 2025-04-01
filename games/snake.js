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
let x = 20 * 10;
let y = (canvas.height / 2);
let ax = canvas.width - (canvas.width - aRadius) / 4;
let ay = (canvas.height / 2);
function drawApple() {
    ctx.beginPath();
    ctx.arc(ax, ay, aRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}
// test, delete when done (ctrl + shift + l, ctrl + l x2, backspace)
function drawSPos() {ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2, false); ctx.fillStyle = "#0000ff"; ctx.fill();ctx.closePath();}
function drawLine() {
    ctx.beginPath();
    ctx.rect(0, (canvas.height / 2) + 1, canvas.width, 1);
    ctx.fillStyle = "#ffffff";
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
    // test, delete when done (ctrl + shift + l, ctrl + l x2, backspace)
    drawSPos();
    drawLine();
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
    if (x > ax && x < ax && y > ay && y < ay) {
        score += 1;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", String(score));
        }
    }
    if (x + sWidth < 0 || x > canvas.width + sWidth || y + sHeight < 0 || y > canvas.height - sHeight) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
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