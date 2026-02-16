// --- 1. THE 10-BATTLE PROPHECY DATA ---
// This cycles through your 50 images in order as you hit trigger tiles
const prophecySteps = [
    { name: "Kha'bit", enemy: "archer_snake3.jpg", story: "The Void Path coils. Kha'bit guards the first binding." },
    { name: "Void Scourge", enemy: "void_rat1.jpg", story: "A hiss in the dark. The Void Rat hungers for your logic." },
    { name: "Hiss-Lion", enemy: "bblion.jpg", story: "The Chimera of the Sultan appears. 1*1=2 must be proven." },
    { name: "Ice Golem", enemy: "dragon_ice_boss2.jpeg", story: "Entropy freezes the path. Break the Shannon limit." },
    { name: "Mage Mouse", enemy: "mage_mouse.jpeg", story: "Small but ancient. The Mage Mouse tests your Brawn." },
    // ... add the rest of your 10 enemies here following this format
];

let currentStep = 0;
let isBattleMode = false;
let skillPoints = 0;
let enemyHP = 50;

// --- 2. TRANSITION TO BATTLE ---
function initiateBattleMode() {
    if (currentStep >= prophecySteps.length) return;

    isBattleMode = true;
    const step = prophecySteps[currentStep];

    // Show Battle Screen & Typewriter Story
    document.getElementById('battle-screen').style.display = 'block';
    document.getElementById('text-window').style.display = 'block';
    
    // Set Assets
    document.getElementById('enemy-sprite').src = `assets/battlescreen/enemy/${step.enemy}`;
    runTypewriter(step.story);
}

// --- 3. THE SULTAN LAW (COMBAT) ---
function heroAttack() {
    if (!isBattleMode) return;

    // Apply the g.o.g. Law: 1*1=2 logic
    let damage = 10;
    if (skills.sultanLaw.unlocked) {
        damage = 20; // 1*1=2 doubling effect
        console.log("Sultan Law Active: Critical Strike!");
    }

    enemyHP -= damage;

    if (enemyHP <= 0) {
        victory();
    }
}

function victory() {
    alert(`Victory over ${prophecySteps[currentStep].name}! +1 Skill Point.`);
    skillPoints++;
    currentStep++; // Move to the next battle in the 10-step story
    isBattleMode = false;
    enemyHP = 50; // Reset for next enemy
    document.getElementById('battle-screen').style.display = 'none';
}

// --- 4. SKILL TREE (DEAD ISLAND STYLE) ---
const skills = {
    sultanLaw: { unlocked: false, cost: 3, desc: "1*1=2 Multiplier" },
    brawn: { unlocked: false, cost: 1, desc: "+5 Base Damage" }
};

function toggleSkillMenu() {
    const screen = document.getElementById('skill-screen');
    screen.style.display = (screen.style.display === 'none') ? 'block' : 'none';
    renderSkills();
}

function renderSkills() {
    const container = document.getElementById('skill-nodes');
    container.innerHTML = `<p>Points: ${skillPoints}</p>`;
    // Logic to loop through skills and create buttons goes here
}

function runTypewriter(text) {
    const box = document.getElementById('typewriter-text');
    box.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        box.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 40);
}
