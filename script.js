let shipSize = {
    width: 20,  // Tamaño de la nave (ancho)
    height: 20, // Tamaño de la nave (alto)
};

let position = {
    x: 100,  // Posición inicial x
    y: 100   // Posición inicial y
};

let moveRate = 2;  // Velocidad de movimiento (ajustar según lo desees)
let velocity = { x: 0, y: 0 }; // Almacena la velocidad en los ejes X e Y

let spaceship = document.getElementById("spaceship");
let walls = document.querySelectorAll('.wall'); // Asegúrate de que las paredes estén definidas en tu HTML

function checkCollision(x, y) {
    let shipBox = {
        left: x,
        right: x + shipSize.width,
        top: y,
        bottom: y + shipSize.height
    };

    // Chequea si la nave se sale del área del mapa
    if (shipBox.left < 0 || shipBox.right > 400 || shipBox.top < 0 || shipBox.bottom > 400) {
        return true; // Colisión con el borde del mapa
    }

    // Chequea colisiones con las paredes del laberinto
    for (let wall of walls) {
        let wallBox = wall.getBBox();
        if (
            shipBox.right > wallBox.x &&
            shipBox.left < wallBox.x + wallBox.width &&
            shipBox.bottom > wallBox.y &&
            shipBox.top < wallBox.y + wallBox.height
        ) {
            return true; // Colisión con una pared
        }
    }
    return false; // No hay colisión
}

function updatePosition() {
    let newX = position.x + velocity.x;
    let newY = position.y + velocity.y;

    // Solo actualizar si no hay colisión con el mapa o paredes
    if (!checkCollision(newX, newY)) {
        position.x = newX;
        position.y = newY;
    }
}

function refresh() {
    spaceship.setAttribute("cx", position.x + shipSize.width / 2); // Ajustar el centro del círculo
    spaceship.setAttribute("cy", position.y + shipSize.height / 2); // Ajustar el centro del círculo
}

function initialize() {
    // Configura la posición inicial de la nave
    position = {
        x: 100,
        y: 100
    };
    refresh();  // Inicializa la nave en la posición correcta
}

initialize();

function gameLoop() {
    updatePosition(); // Actualiza la posición de la nave
    refresh(); // Actualiza la visualización
    requestAnimationFrame(gameLoop); // Llama al siguiente frame
}

// Control de teclas
window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return; // No hacer nada si el evento ya fue manejado

    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            velocity.y = -moveRate; // Mover hacia arriba
            break;
        case "KeyS":
        case "ArrowDown":
            velocity.y = moveRate; // Mover hacia abajo
            break;
        case "KeyA":
        case "ArrowLeft":
            velocity.x = -moveRate; // Mover hacia la izquierda
            break;
        case "KeyD":
        case "ArrowRight":
            velocity.x = moveRate; // Mover hacia la derecha
            break;
    }

    if (event.code !== "Tab") {
        event.preventDefault(); // Prevenir el comportamiento por defecto
    }
});

// Para detener el movimiento al soltar la tecla
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
        case "KeyS":
        case "ArrowDown":
            velocity.y = 0; // Detener el movimiento vertical
            break;
        case "KeyA":
        case "ArrowLeft":
        case "KeyD":
        case "ArrowRight":
            velocity.x = 0; // Detener el movimiento horizontal
            break;
    }
});

// Iniciar el bucle de juego
gameLoop();
