let shipSize = {
    width: 18,  // Tamaño actualizado
    height: 18, // Tamaño actualizado
};

let position = {
    x: 0,  // Posición inicial x
    y: 0   // Posición inicial y
};

let moveRate = 20;  // Movimiento en una celda
let angle = 0;      // Ángulo inicial (mirando hacia el norte: 0°)

let spaceship = document.getElementById("spaceship");
let walls = document.querySelectorAll('.wall');
let goal = document.querySelectorAll('goalPosition');

// Asegúrate de que 'spaceship' y 'walls' están bien definidos y cargados antes de la primera llamada a 'refresh'

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


function updatePosition(offset) {
    let rad = angle * (Math.PI / 180);
    let newX = position.x + Math.sin(rad) * offset;
    let newY = position.y - Math.cos(rad) * offset;

    // Solo actualizar si no hay colisión con el mapa o paredes
    if (!checkCollision(newX, newY)) {
        position.x = newX;
        position.y = newY;
    }
}

function refresh() {
    // Posición del triángulo en el SVG (ajustada para el centro del triángulo)
    let x = position.x;
    let y = position.y;
    let transform = `translate(${x} ${y}) rotate(${angle} ${shipSize.width / 2} ${shipSize.height / 2})`;

    if (spaceship) {  // Asegúrate de que 'spaceship' está definido
        spaceship.setAttribute("transform", transform);
    }
}

function initialize() {
    // Configura la posición inicial de la nave
    position = {
        x: 100,  // Por ejemplo, posición x inicial
        y: 100   // Por ejemplo, posición y inicial
    };
    refresh();  // Inicializa la nave en la posición correcta
}

initialize();

window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return; // No hacer nada si el evento ya fue manejado
        }

        switch (event.code) {
            case "KeyS":
            case "ArrowDown":
                // Mover hacia atrás
                updatePosition(-moveRate);
                break;
            case "KeyW":
            case "ArrowUp":
                // Mover hacia adelante
                updatePosition(moveRate);
                break;
            case "KeyA":
            case "ArrowLeft":
                // Girar 90° a la izquierda
                angle = (angle - 90 + 360) % 360;
                break;
            case "KeyD":
            case "ArrowRight":
                // Girar 90° a la derecha
                angle = (angle + 90) % 360;
                break;
        }

        refresh();

        if (event.code !== "Tab") {
            event.preventDefault(); // Prevenir el comportamiento por defecto
        }
    },
    true,
);


