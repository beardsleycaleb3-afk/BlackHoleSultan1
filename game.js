// --- 1. SETUP ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;
const MAP_SIZE = 200; // Your 200x200 grid

// Player Object
const player = {
    x: 64,  // Starting at Tile 2
    y: 64,  // Starting at Tile 2
    velX: 0,
    velY: 0,
    dir: 'south'
};

// Tile Asset Map (Matching your renamed files)
const TILE_ASSETS = {
    0: 'assets/maps/100walkable_floor2.png',
    3: 'assets/maps/corner.png',
    5: 'assets/maps/triggerbattlefloortile.png', // THE TRIGGER
    8: 'assets/maps/wall_t.png',
    9: 'assets/maps/wall_Left.png'
};

// --- 2. THE MAP DATA (Example Section) ---
// Ensure your 200x200 array is loaded here
let mapData = [
    [8, 8, 8, 8, 8],
    [9, 0, 0, 0, 2],
    [9, 0, 5, 0, 2], // Tile 5 is the battle trigger
    [4, 4, 4, 4, 4]
];

// --- 3. THE SENSOR (COLLISION & TRIGGER) ---
function checkCollision() {
    const gridX = Math.floor((player.x + 16) / TILE_SIZE);
    const gridY = Math.floor((player.y + 16) / TILE_SIZE);

    if (mapData[gridY] && mapData[gridY][gridX] === 5) {
        // HIT THE TRIGGER
        mapData[gridY][gridX] = 0; // Clear the tile
        
        // Stop movement
        player.velX = 0;
        player.velY = 0;

        // SWITCH TO BATTLE (From battle.js)
        if (typeof initiateBattleMode === "function") {
            initiateBattleMode();
        }
    }
}

// --- 4. GAME LOOP ---
function update() {
    if (isBattleMode) return; // Freeze overworld during fight

    // Apply movement with slight friction for Minecraft-style feel
    player.x += player.velX;
    player.y += player.velY;
    player.velX *= 0.9;
    player.velY *= 0.9;

    checkCollision();
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Map Tiles
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            const tileType = mapData[y][x];
            const img = new Image();
            img.src = TILE_ASSETS[tileType] || TILE_ASSETS[0];
            ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // Draw Hero (rs_hero.png)
    const heroImg = new Image();
    heroImg.src = `assets/rs/${player.dir}_idlers.png`;
    ctx.drawImage(heroImg, player.x, player.y, TILE_SIZE, TILE_SIZE);
}

// Start the engine
update();
