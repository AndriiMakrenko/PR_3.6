const Pokemon = {
    attack: function(damage) {
        this.health -= damage;
        this.updateHealth();
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} проиграл! Начинаем заново.`);
            location.reload();
        }
    },

    updateHealth: function() {
        this.progressBar.style.width = (this.health / this.maxHealth * 100) + '%';
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    },

    reset: function() {
        this.health = this.maxHealth;
        this.updateHealth();
    },

    takeDamage: function(damage) {
        this.attack(damage);
    }
};

const character = Object.create(Pokemon);
character.name = 'Pikachu';
character.level = 1;
character.health = 100;
character.maxHealth = 100;
character.progressBar = document.getElementById('progressbar-character');
character.healthText = document.getElementById('health-character');

const enemy = Object.create(Pokemon);
enemy.name = 'Bulbasaur';
enemy.level = 1;
enemy.health = 100;
enemy.maxHealth = 100;
enemy.progressBar = document.getElementById('progressbar-enemy');
enemy.healthText = document.getElementById('health-enemy');

const enemy2 = Object.create(Pokemon);
enemy2.name = 'Squirtle';
enemy2.level = 2;
enemy2.health = 100;
enemy2.maxHealth = 100;
enemy2.progressBar = document.getElementById('progressbar-enemy2');
enemy2.healthText = document.getElementById('health-enemy2');

let currentEnemy = enemy;

function getEnemyDamage() {
    return 10;
}

function getEnemy2Damage() {
    return 3;
}

document.getElementById('btn-kick').addEventListener('click', function() {
    character.takeDamage(5);
    if (currentEnemy.health > 0) {
        currentEnemy.takeDamage(currentEnemy === enemy ? getEnemyDamage() : getEnemy2Damage());
    }
});

document.getElementById('btn-harm').addEventListener('click', function() {
    character.takeDamage(8);
    if (currentEnemy.health > 0) {
        currentEnemy.takeDamage(currentEnemy === enemy ? getEnemyDamage() : getEnemy2Damage());
    }
});

document.getElementById('btn-extra-harm').addEventListener('click', function() {
    character.takeDamage(12);
    if (currentEnemy.health > 0) {
        currentEnemy.takeDamage(currentEnemy === enemy ? getEnemyDamage() : getEnemy2Damage());
    }
});

document.getElementById('btn-switch-enemy').addEventListener('click', function() {
    currentEnemy = currentEnemy === enemy ? enemy2 : enemy;
    document.getElementById('enemy2-container').style.display = currentEnemy === enemy2 ? "block" : "none";
    document.getElementById('enemy-container').style.display = currentEnemy === enemy ? "block" : "none";
});
