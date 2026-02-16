// --- 1. ENGINE SETUP ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 32;

// Auto-adjust canvas to fit the 70% viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.7;

const VIEWPORT_W = canvas.width;
const VIEWPORT_H = canvas.height;

// --- 2. PLAYER STATE ---
const player = {
    x: 100 * TILE_SIZE, // Start in the middle of the 200x200 map
    y: 100 * TILE_SIZE,
    velX: 0,
    velY: 0,
    dir: 'south'
};

// --- 3. ASSET DATABASE ---
const TILE_ASSETS = {
    0: 'assets/maps/100walkable_floor2.png',
    3: 'assets/maps/corner.png',
    5: 'assets/maps/triggerbattlefloortile.png', 
    8: 'assets/maps/wall_t.png',
    9: 'assets/maps/wall_Left.png'
};

// --- 4. MAP GENERATOR (Full 200x200) ---
let mapData = [];
function generateWorld() {
    for (let y = 0; y < 200; y++) {
        let row = [];
        for (let x = 0; x < 200; x++) {
            if (y === 0 || y === 199) row.push(8);      // Top/Bottom Walls
            else if (x === 0 || x === 199) row.push(9); // Side Walls
            else if (Math.random() < 0.01) row.push(5);  // Battle Triggers
            else row.push(0);                           // Floor
        }
        mapData.push(row);
    }
}
generateWorld();

// --- 5. SENSORS & COLLISIONS ---
function checkCollision() {
    const tx = Math.floor((player.x + 16) / TILE_SIZE);
    const ty = Math.floor((player.y + 16) / TILE_SIZE);
    
    // Check if player stepped on a Trigger Tile
    if (mapData[ty] && mapData[ty][tx] === 5) {
        mapData[ty][tx] = 0; // Clear the tile so it's gone
        player.velX = 0; 
        player.velY = 0;
        
        // Call the transition to battle.js
        if (typeof initiateBattleMode === "function") {
            initiateBattleMode();
        }
    }
}

// --- 6. RENDER ENGINE (Camera Follow) ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate Camera (keeps Sultan centered)
    let camX = player.x - VIEWPORT_W / 2;
    let camY = player.y - VIEWPORT_H / 2;

    // Only draw tiles visible on the phone screen (Performance)
    let startCol = Math.max(0, Math.floor(camX / TILE_SIZE));
    let endCol = Math.min(199, startCol + Math.ceil(VIEWPORT_W / TILE_SIZE) + 1);
    let startRow = Math.max(0, Math.floor(camY / TILE_SIZE));
    let endRow = Math.min(199, startRow + Math.ceil(VIEWPORT_H / TILE_SIZE) + 1);

    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            let tileType = mapData[r][c];
            let img = new Image();
            img.src = TILE_ASSETS[tileType] || TILE_ASSETS[0];
            ctx.drawImage(img, c * TILE_SIZE - camX, r * TILE_SIZE - camY, TILE_SIZE, TILE_SIZE);
        }
    }

    // Draw the Hero (Idler Image)
    let heroImg = new Image();
    heroImg.src = `assets/rs/${player.dir}_idlers.png`;
    ctx.drawImage(heroImg, player.x - camX, player.y - camY, TILE_SIZE, TILE_SIZE);
}

// --- 7. GAME LOOP ---
function update() {
    // If battle mode is on, freeze the map
    if (typeof isBattleMode !== 'undefined' && isBattleMode) {
        requestAnimationFrame(update);
        return;
    }

    player.x += player.velX;
    player.y += player.velY;

    // Apply Friction for smooth movement
    player.velX *= 0.85;
    player.velY *= 0.85;

    checkCollision();
    draw();
    requestAnimationFrame(update);
}

// Launch
update();
