let characterHealth = 100;
let level = 1; 
let currentOpponent = null; 

let opponents = {
    enemy1: { health: 100, name: "Bulbasaur", progressBarId: "progressbar-enemy", healthDisplayId: "health-enemy"},
    enemy2: { health: 100, name: "Squirtle", progressBarId: "progressbar-enemy2", healthDisplayId: "health-enemy2"}
};

const healthCharacterDisplay = document.getElementById("health-character");
const attackButton = document.getElementById("btn-kick");
const harmButton = document.getElementById("btn-harm");
const extraDamageButton = document.getElementById("btn-extra-harm");
const enemyContainer = document.getElementById("enemy-container");
const enemy2Container = document.getElementById("enemy2-container");

function updateHealth(health, progressBarId, healthDisplayId) {
    document.getElementById(healthDisplayId).textContent = `${health} / 100`;
    document.getElementById(progressBarId).style.width = `${(health / 100) * 100}%`;
    document.getElementById(progressBarId).style.backgroundColor = health < 30 ? "red" : "green";
}

function performAttack(opponent, damage) {
    opponent.health -= damage;
    if (opponent.health < 0) opponent.health = 0;
    updateHealth(opponent.health, opponent.progressBarId, opponent.healthDisplayId);
    if (opponent.health === 0) {
        alert(`Ви перемогли ${opponent.name}!`); 
        if (opponent.name === "Bulbasaur") {
            level++; 
            resetOpponent(); 
        } else {
            resetHealth(); 
        }
    }
}

function randomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attackOpponent(opponent, minDamage, maxDamage) {
    const attackSuccess = Math.random() < 0.9; 
    if (attackSuccess) {
        const damage = randomDamage(minDamage, maxDamage);
        performAttack(opponent, damage);
        if (opponent.health > 0) {
            const counterDamage = randomDamage(minDamage, maxDamage);
            characterHealth -= counterDamage;
            if (characterHealth < 0) characterHealth = 0;
            updateHealth(characterHealth, "progressbar-character", "health-character");
            if (characterHealth === 0) {
                alert("Вам не пощастило! Ви програли! Гра перезапущена.");
                resetHealth(); 
            }
        }
    } else {
        alert("Атака не удалась!"); 
    }
}

function resetOpponent() {
    if (level === 2) {
        currentOpponent = opponents.enemy2; 
        updateHealth(opponents.enemy2.health, opponents.enemy2.progressBarId, opponents.enemy2.healthDisplayId); 
        enemyContainer.style.display = "none"; 
        enemy2Container.style.display = "block"; 
    } else {
        resetHealth(); 
    }
}

attackButton.addEventListener("click", () => {
    if (!currentOpponent) {
        currentOpponent = opponents.enemy1; 
    }
    attackOpponent(currentOpponent, 5, 20); 
});

harmButton.addEventListener("click", () => {
    if (!currentOpponent) {
        currentOpponent = opponents.enemy2; 
    }
    attackOpponent(currentOpponent, 10, 30); 
});

extraDamageButton.addEventListener("click", () => {
    if (!currentOpponent) {
        currentOpponent = opponents.enemy1; 
    }
    attackOpponent(currentOpponent, 15, 35); 
});

function resetHealth() {
    characterHealth = 100;
    opponents.enemy1.health = 100; 
    opponents.enemy2.health = 100; 
    updateHealth(characterHealth, "progressbar-character", "health-character");
    updateHealth(opponents.enemy1.health, "progressbar-enemy", "health-enemy");
    updateHealth(opponents.enemy2.health, "progressbar-enemy2", "health-enemy2");
    enemyContainer.style.display = "block"; 
    enemy2Container.style.display = "none"; 
    level = 1; 
    currentOpponent = opponents.enemy1; 
}

resetHealth();
