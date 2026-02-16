// --- 1. BATTLE STATE ---
let isBattleMode = false;
let skillPoints = 0;
let heroHP = 100;
let enemyHP = 50;

function initiateBattleMode(enemyFile) {
    isBattleMode = true;
    document.getElementById('map-container').style.filter = "grayscale(100%) blur(5px)";
    
    const battleUI = document.getElementById('battle-screen');
    battleUI.style.display = 'block';
    battleUI.style.backgroundImage = "url('assets/battlescreen/mainbackground/battlescreen.png')";
    
    const enemyImg = document.getElementById('enemy-sprite');
    enemyImg.src = `assets/battlescreen/enemy/${enemyFile}`;
    
    console.log("Battle Started: Hero vs " + enemyFile);
}

// --- 2. COMBAT LOGIC (Button A) ---
function heroAttack() {
    if (!isBattleMode) return;

    let damage = 10;
    // Apply Sultan Law: 1*1=2 multiplier if skill is unlocked
    if (skills.sultanLaw.unlocked) damage *= 2;

    enemyHP -= damage;
    console.log(`Enemy takes ${damage} damage. HP: ${enemyHP}`);

    if (enemyHP <= 0) {
        winBattle();
    } else {
        enemyTurn();
    }
}

function winBattle() {
    alert("Victory! +1 Skill Point earned.");
    skillPoints++;
    isBattleMode = false;
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('map-container').style.filter = "none";
    enemyHP = 50; // Reset for next fight
}

// --- 3. SKILL MAP (Dead Island Style) ---
const skills = {
    voidGrip: { unlocked: false, cost: 1, desc: "Bind enemies" },
    sultanLaw: { unlocked: false, cost: 3, desc: "1*1=2 Multiplier" }
};

function toggleSkillMenu() {
    const menu = document.getElementById('skill-screen');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        renderSkills();
    } else {
        menu.style.display = 'none';
    }
}

function renderSkills() {
    const container = document.getElementById('skill-nodes');
    container.innerHTML = `<p>Points Available: ${skillPoints}</p>`;
    
    for (let key in skills) {
        const s = skills[key];
        const btn = document.createElement('button');
        btn.innerText = `${key}: ${s.unlocked ? 'UNLOCKED' : 'LOCKED ('+s.cost+'pts)'}`;
        btn.onclick = () => {
            if (skillPoints >= s.cost && !s.unlocked) {
                skillPoints -= s.cost;
                s.unlocked = true;
                renderSkills();
            }
        };
        container.appendChild(btn);
    }
}
