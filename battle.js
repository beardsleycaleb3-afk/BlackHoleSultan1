// --- 1. THE 10-BATTLE PROPHECY DATA ---
// I've mapped these to your specific renamed GitHub assets.
const prophecySteps = [
    { name: "Void Rat", enemy: "void_rat1.jpg", story: "The Void Path begins. A scout from the dark nibbles at reality." },
    { name: "Snake Archer", enemy: "archer_snake3.jpg", story: "Hissing arrows fly. The Snake Archer tests your agility." },
    { name: "Hissing One", enemy: "hisser.jpg", story: "The ground vibrates. The Hisser emerges from the floor tiles." },
    { name: "Mage Mouse", enemy: "mage_mouse.jpeg", story: "Small, but the magic is ancient. Don't underestimate the rodent." },
    { name: "Void Mouse", enemy: "void_mouse.jpg", story: "The sibling of the scout. The Void hunger grows stronger." },
    { name: "Ice Dragon", enemy: "dragon_ice_boss2.jpeg", story: "Entropy reaches zero. The Dragon of Ice freezes the Shannon limit." },
    { name: "Sultan Lion", enemy: "bblion.jpg", story: "The Guardian of the Law. Only 1*1=2 can breach this hide." },
    { name: "Great Chimera", enemy: "boss_snake_lion.jpg", story: "The ultimate fusion. The Snake and Lion become one." }
    // Add 2 more here to reach your 10 total
];

let currentStep = 0;
let isBattleMode = false;
let enemyHP = 50;

// --- 2. THE TRIGGER (Called by Tile 5 in game.js) ---
function initiateBattleMode() {
    if (currentStep >= prophecySteps.length) {
        console.log("The Prophecy is fulfilled. No more enemies.");
        return;
    }

    isBattleMode = true;
    const step = prophecySteps[currentStep];

    // Show Battle Screen
    const battleUI = document.getElementById('battle-screen');
    battleUI.style.display = 'block';
    
    // Set the specific background you requested
    battleUI.style.backgroundImage = "url('assets/battlescreen/mainbackground/battlescrn.png')";
    battleUI.style.backgroundSize = "cover";

    // Load Enemy Sprite
    const enemyImg = document.getElementById('enemy-sprite');
    enemyImg.src = `assets/battlescreen/enemy/${step.enemy}`;

    // Start Story Typewriter
    document.getElementById('text-window').style.display = 'block';
    runTypewriter(step.story);
}

// --- 3. COMBAT LOGIC (Button A) ---
function heroAttack() {
    if (!isBattleMode) return;

    // Apply Sultan Law: 1*1=2 (Doubles damage if skill unlocked)
    let damage = 10;
    if (skills.sultanLaw.unlocked) {
        damage = 20; 
        console.log("The Law of 1*1=2 is applied!");
    }

    enemyHP -= damage;

    if (enemyHP <= 0) {
        winBattle();
    } else {
        console.log(`Enemy HP: ${enemyHP}`);
    }
}

function winBattle() {
    alert(`Victory! ${prophecySteps[currentStep].name} defeated.`);
    skillPoints++;
    currentStep++; // Move to next battle in the array
    isBattleMode = false;
    enemyHP = 50; // Reset for next fight
    
    // Hide battle screen, return to map
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';
}

// --- 4. TYPEWRITER EFFECT ---
function runTypewriter(text) {
    const box = document.getElementById('typewriter-text');
    box.innerHTML = "";
    let i = 0;
    const speed = 50; 

    function type() {
        if (i < text.length) {
            box.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
