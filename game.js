// --- 1. CONFIGURATION & MAP DATA ---
const TILE_SIZE = 32;
const MAP_DIM = 200;
const VIEWPORT_W = window.innerWidth;
const VIEWPORT_H = window.innerHeight * 0.7;

let player = { x: 2 * TILE_SIZE, y: 2 * TILE_SIZE, velX: 0, velY: 0 };
let mapData = [];
let storyIndex = 0;

// Tile Key: 0: Walk, 3: Corner, 8: Top, 4: Bottom, 9: Left, 2: Right, 5: Battle, 6: Start, 1: Exit
function generateMap() {
    const container = document.getElementById('map-container');
    container.style.gridTemplateColumns = `repeat(${MAP_DIM}, ${TILE_SIZE}px)`;

    for (let y = 0; y < MAP_DIM; y++) {
        mapData[y] = [];
        for (let x = 0; x < MAP_DIM; x++) {
            let tileType = 0;
            // Border Logic
            if (y === 0 || y === MAP_DIM - 1 || x === 0 || x === MAP_DIM - 1) {
                tileType = (y === 0 && x === 0) ? 3 : (y === 0) ? 8 : (y === MAP_DIM - 1) ? 4 : (x === 0) ? 9 : 2;
            } else if (Math.random() < 0.01) {
                tileType = 5; // Random Battle Trigger
            }
            mapData[y][x] = tileType;

            // Only render visible tiles for performance (Simplified for now)
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.width = `${TILE_SIZE}px`;
            tile.style.height = `${TILE_SIZE}px`;
            // Add background images based on tileType here
            container.appendChild(tile);
        }
    }
}

// --- 2. SMOOTH NAVIGATION (MINECRAFT STYLE) ---
function update() {
    // Apply velocity to player position
    player.x += player.velX;
    player.y += player.velY;

    // Friction
    player.velX *= 0.85;
    player.velY *= 0.85;

    // Camera Follow: Move the map relative to player
    const mapContainer = document.getElementById('map-container');
    const offsetX = (VIEWPORT_W / 2) - player.x;
    const offsetY = (VIEWPORT_H / 2) - player.y;
    mapContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    checkCollision();
    requestAnimationFrame(update);
}

// --- 3. COLLISION & STORY TRIGGER ---
function checkCollision() {
    const gridX = Math.floor(player.x / TILE_SIZE);
    const gridY = Math.floor(player.y / TILE_SIZE);

    if (mapData[gridY] && mapData[gridY][gridX] === 5) {
        mapData[gridY][gridX] = 0; // Clear the trigger
        triggerStory();
    }
}

function triggerStory() {
    const textWin = document.getElementById('text-window');
    const textContent = document.getElementById('typewriter-text');
    textWin.style.display = 'block';
    
    // Typewriter effect logic
    let text = "Hiss... A Snake Archer blocks the path. The Law binds!";
    let i = 0;
    textContent.innerHTML = "";
    const timer = setInterval(() => {
        textContent.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(timer);
    }, 50);
}

// Initialize
generateMap();
update();
