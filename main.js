document.addEventListener('DOMContentLoaded', () => {
    const logs = [
        '[ПЕРСОНАЖ №1] згадав щось важливе, але раптово [ПЕРСОНАЖ №2], не пам\'ятаючи себе від страху, вдарив у передпліччя ворога.',
        '[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку вдарив коліном у лоб ворога.',
        '[ПЕРСОНАЖ №1] задумався, але в цей час нахабний [ПЕРСОНАЖ №2], прийнявши вольове рішення, безшумно підійшов ззаду і вдарив.',
        '[ПЕРСОНАЖ №1] прийшов до тями, але раптово [ПЕРСОНАЖ №2] випадково завдав потужного удару.',
        '[ПЕРСОНАЖ №1] поперхнувся, але в цей час [ПЕРСОНАЖ №2] неохоче роздробив кулаком ворога.',
        '[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2] похитнувся і завдав підступного удару.',
        '[ПЕРСОНАЖ №1] висморкався, але раптово [ПЕРСОНАЖ №2] завдав дроблячого удару.',
        '[ПЕРСОНАЖ №1] похитнувся, і раптом нахабний [ПЕРСОНАЖ №2] без причини вдарив у ногу противника.',
        '[ПЕРСОНАЖ №1] засмутився, як раптом, несподівано [ПЕРСОНАЖ №2] випадково завдав удару в живіт суперника.',
        '[ПЕРСОНАЖ №1] намагався щось сказати, але раптом [ПЕРСОНАЖ №2] від нудьги розбив брову супротивнику.'
    ];

    const logsDiv = document.createElement('div');
    logsDiv.id = 'logs';
    document.body.appendChild(logsDiv);

    const addLog = (message) => {
        const newLog = document.createElement('p');
        newLog.textContent = message;
        logsDiv.prepend(newLog);
    };

    const getRandomLog = (character1, character2) => {
        const randomIndex = Math.floor(Math.random() * logs.length);
        return logs[randomIndex].replace('[ПЕРСОНАЖ №1]', character1).replace('[ПЕРСОНАЖ №2]', character2);
    };

    const character = {
        name: 'Pikachu',
        health: 100,
        maxHealth: 100,
        progressBar: document.getElementById('progressbar-character'),
        healthText: document.getElementById('health-character'),

        updateHealthBar() {
            const { health, maxHealth, progressBar, healthText } = this;
            this.health = Math.max(health, 0);
            const healthPercentage = (this.health / maxHealth) * 100;
            progressBar.style.width = `${healthPercentage}%`;
            healthText.textContent = `${this.health} / ${this.maxHealth}`;
        },

        receiveDamage(damage, enemyName) {
            this.health -= damage;
            this.updateHealthBar();
            const logMessage = getRandomLog(this.name, enemyName);
            addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
        },
    };

    const enemy = {
        name: 'Bulbasaur',
        health: 100,
        maxHealth: 100,
        progressBar: document.getElementById('progressbar-enemy'),
        healthText: document.getElementById('health-enemy'),

        updateHealthBar() {
            const { health, maxHealth, progressBar, healthText } = this;
            this.health = Math.max(health, 0);
            const healthPercentage = (this.health / maxHealth) * 100;
            progressBar.style.width = `${healthPercentage}%`;
            healthText.textContent = `${this.health} / ${this.maxHealth}`;
        },

        receiveDamage(damage, characterName) {
            this.health -= damage;
            this.updateHealthBar();
            const logMessage = getRandomLog(this.name, characterName);
            addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
        },
    };

    const checkGameOver = () => {
        const isCharacterDefeated = character.health === 0;
        const isEnemyDefeated = enemy.health === 0;

        if (isCharacterDefeated && isEnemyDefeated) {
            addLog('Нічия! Всі учасники бою втратили здоров\'я!');
            alert('Нічия! Всі учасники бою втратили здоров\'я!');
            location.reload();
        } else if (isCharacterDefeated) {
            addLog('Гра закінчена! Пікачу програв!');
            alert('Гра закінчена! Пікачу програв!');
            location.reload();
        } else if (isEnemyDefeated) {
            addLog('Вітаємо! Пікачу переміг Бульбазавра!');
            alert('Вітаємо! Пікачу переміг Бульбазавра!');
            location.reload();
        }
    };

    const attackEnemy = (damage) => {
        enemy.receiveDamage(damage, character.name);
        const characterDamage = Math.floor(Math.random() * 20) + 1;
        character.receiveDamage(characterDamage, enemy.name);
        checkGameOver();
    };

    const createClickCounter = (limit) => {
        let clicks = 0;
        const clickInfoElement = document.getElementById('click-info');
        
        return (buttonName) => {
            if (clicks < limit) {
                clicks++;
                const remainingClicks = limit - clicks;
                clickInfoElement.textContent = `${buttonName}: натиснуто ${clicks} раз(и). Залишилось: ${remainingClicks} натискань.`;
                return true; 
            } else {
                clickInfoElement.textContent = `${buttonName}: більше не можна натискати. Ліміт досягнуто.`;
                return false; 
            }
        };
    };

    const btnKickCounter = createClickCounter(6);
    const btnHarmCounter = createClickCounter(6);
    const btnExtraHarmCounter = createClickCounter(6);

    document.getElementById('btn-kick').addEventListener('click', () => {
        if (btnKickCounter('Thunder Jolt')) {
            attackEnemy(5);
        }
    });

    document.getElementById('btn-harm').addEventListener('click', () => {
        if (btnHarmCounter('Thundershock')) {
            attackEnemy(8);
        }
    });

    document.getElementById('btn-extra-harm').addEventListener('click', () => {
        if (btnExtraHarmCounter('Extra Damage')) {
            attackEnemy(12);
        }
    });
});
