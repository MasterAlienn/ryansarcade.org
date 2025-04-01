var blocks = [
    
]
function startGame() {
    myGameArea.start();
    char = new component(20, 20, "green", 100, 200);
}
var myGameArea = {
    canvas : document.getElementsByClassName("tetris")[0],
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener("keydown", function(e) {
            if (e.key == w) {
                moveUp();
            }
        });
        window.addEventListener("keyup", function(e) {
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    this.newpos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function updateGameArea() {
    myGameArea.clear();
    block.update()
}
function moveUp() {
    char.speedY += 20;
}
function moveDown() {
    char.speedY -= 20;
}
function moveLeft() {
    char.speedX -= 20;
}
function moveRight() {
    char.speedX += 20;
}
startGame();