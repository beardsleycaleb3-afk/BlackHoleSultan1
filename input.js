// --- 1. JOYSTICK LOGIC ---
const stick = document.getElementById('joystick-stick');
const base = document.getElementById('joystick-base');
const baseRect = base.getBoundingClientRect();
const centerX = baseRect.left + baseRect.width / 2;
const centerY = baseRect.top + baseRect.height / 2;
const maxRadius = baseRect.width / 2;

base.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    // Calculate distance from center
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Clamp stick to the base radius
    if (distance > maxRadius) {
        dx = (dx / distance) * maxRadius;
        dy = (dy / distance) * maxRadius;
    }

    // Visually move the stick
    stick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Send movement to player velocity in game.js
    // Adjust 0.1 to change Minecraft-style "gliding" speed
    player.velX = (dx / maxRadius) * 4; 
    player.velY = (dy / maxRadius) * 4;
});

base.addEventListener('touchend', () => {
    // Snap stick back to center
    stick.style.transform = `translate(0px, 0px)`;
    // Player glides to a stop via friction in game.js
});

// --- 2. A/B BUTTON LOGIC ---
const btnA = document.getElementById('btn-a');
const btnB = document.getElementById('btn-b');

btnA.addEventListener('touchstart', (e) => {
    e.preventDefault();
    console.log("Button A: Accept/Attack pressed");
    
    if (document.getElementById('text-window').style.display === 'block') {
        // If story is visible, Button A closes it or starts battle
        handleStoryAccept();
    } else if (isBattleMode) {
        // Trigger combat move
        heroAttack();
    }
});

btnB.addEventListener('touchstart', (e) => {
    e.preventDefault();
    console.log("Button B: Decline/Skill Menu pressed");
    
    if (!isBattleMode) {
        toggleSkillMenu(); // Dead Island style skill map
    }
});

function handleStoryAccept() {
    document.getElementById('text-window').style.display = 'none';
    // Logic to switch to battlescreen.png and start the turn-based fight
    initiateBattleMode();
}
