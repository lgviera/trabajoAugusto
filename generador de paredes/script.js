const gridSize = 20; // Tamaño de cada celda en la cuadrícula (20x20 píxeles)
const gridWidth = 20; // Número de celdas en el eje X
const gridHeight = 20; // Número de celdas en el eje Y
const walls = []; // Almacenará las posiciones de las paredes

const svg = document.getElementById('grid');

// Dibujar la cuadrícula
for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x * gridSize);
        rect.setAttribute('y', y * gridSize);
        rect.setAttribute('width', gridSize);
        rect.setAttribute('height', gridSize);
        rect.setAttribute('stroke', 'black');
        rect.setAttribute('fill', 'none');
        rect.addEventListener('click', () => toggleWall(x, y, rect));
        svg.appendChild(rect);
    }
}

// Alternar pared en la cuadrícula al hacer clic
function toggleWall(x, y, rect) {
    let wallIndex = walls.findIndex(w => w.x === x && w.y === y);

    if (wallIndex === -1) {
        // Añadir pared
        walls.push({ x, y });
        rect.setAttribute('class', 'wall');
    } else {
        // Eliminar pared
        walls.splice(wallIndex, 1);
        rect.removeAttribute('class');
    }
}

// Generar el código de las posiciones de las paredes
document.getElementById('generate-code').addEventListener('click', () => {
    let code = `const walls = [\n`;
    walls.forEach(w => {
        let wallPosition = `{ x: ${w.x * gridSize}, y: ${w.y * gridSize}, width: ${gridSize}, height: ${gridSize} }`;
        code += `  ${wallPosition},\n`;
    });
    code += `];`;
    document.getElementById('code-output').textContent = code;
});
