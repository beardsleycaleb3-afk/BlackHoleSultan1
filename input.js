// --- 1. CONFIGURATION ---
const stick = document.getElementById('joystick-stick');
const base = document.getElementById('joystick-base');
const baseRect = base.getBoundingClientRect();
const centerX = baseRect.left + baseRect.width / 2;
const centerY = baseRect.top + baseRect.height / 2;
const maxRadius = baseRect.width / 2;

// --- 2. TOUCH MOVEMENT ---
base.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > maxRadius) {
        dx = (dx / distance) * maxRadius;
        dy = (dy / distance) * maxRadius;
    }

    // Move the visual stick
    stick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Update Player Velocity (Minecraft-style gliding)
    player.velX = (dx / maxRadius) * 5; 
    player.velY = (dy / maxRadius) * 5;

    // --- SPRITE SWAPPING LOGIC ---
    // Swaps the overworld image based on joystick angle
    const heroEl = document.getElementById('hero-overworld');
    if (Math.abs(dx) > Math.abs(dy)) {
        player.dir = (dx > 0) ? 'east' : 'west';
    } else {
        player.dir = (dy > 0) ? 'south' : 'north';
    }
    
    // Uses your renamed "idlers" assets
    heroEl.style.backgroundImage = `url('assets/rs/${player.dir}_idlers.png')`;
});

// --- 3. STOP MOVEMENT ---
base.addEventListener('touchend', () => {
    stick.style.transform = `translate(0px, 0px)`;
    // Velocity will bleed off naturally in game.js via friction
});

// --- 4. BUTTONS ---
document.getElementById('btn-a').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (isBattleMode) {
        heroAttack(); // Located in battle.js
    } else if (document.getElementById('text-window').style.display === 'block') {
        handleStoryAccept();
    }
});

document.getElementById('btn-b').addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleSkillMenu(); // Opens Dead Island style skill map
});
