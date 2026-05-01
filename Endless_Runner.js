const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1900;
canvas.height = 900;

const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
    velocityX: 5,
    velocityY: 0
};

let cameraX = 0;

const gravity = 0.5;
const ground = canvas.height - 50;

// movimiento horizontal automático
function movePlayer() {
    player.x += player.velocityX;
}

// gravedad
function applyGravity() {
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y + player.height > ground) {
        player.y = ground - player.height;
        player.velocityY = 0;
    }
}

// cámara que sigue al jugador
function updateCamera() {
    cameraX = player.x - canvas.width / 2 + player.width / 2;
}

// dibujado
function show() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // fondo
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // suelo
    ctx.fillStyle = "green";
    ctx.fillRect(0, ground, canvas.width, 50);

    // jugador (con cámara)
    ctx.fillStyle = "yellow";
    ctx.fillRect(
        player.x - cameraX,
        player.y,
        player.width,
        player.height
    );
}

// loop del juego
function loop() {
    movePlayer();
    applyGravity();
    updateCamera();
    show();
    requestAnimationFrame(loop);
}

loop();

// salto
document.addEventListener("mousedown", jump);

function jump() {
    player.velocityY = -13;
}