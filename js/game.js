import { Pokemon } from './pokemon.js';
import { addLog, getRandomLog } from './logs.js';

export const initializeGame = () => {
    const character = new Pokemon(
        'Pikachu',
        './assets/png-transparent-pikachu-art-t-shirt-pikachu-mammal-vertebrate-computer-wallpaper.png',
        100,
        10, 
        document.getElementById('progressbar-character'),
        document.getElementById('health-character')
    );

    const enemy = new Pokemon(
        'Bulbasaur',
        './assets/bulbasaur.png', 
        100,
        8, 
        document.getElementById('progressbar-enemy'),
        document.getElementById('health-enemy')
    );

    const checkGameOver = () => {
        const isCharacterDefeated = character.health <= 0;
        const isEnemyDefeated = enemy.health <= 0;

        if (isCharacterDefeated && isEnemyDefeated) {
            addLog("Нічия! Всі учасники бою втратили здоров'я!");
            alert("Нічия! Всі учасники бою втратили здоров'я!");
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
        const enemyLogMessage = enemy.receiveDamage(damage);
        addLog(`${getRandomLog(character.name, enemy.name)} ${enemyLogMessage}`);

        const characterDamage = Math.floor(Math.random() * 20) + 1;
        const characterLogMessage = character.receiveDamage(characterDamage);
        addLog(`${getRandomLog(enemy.name, character.name)} ${characterLogMessage}`);

        checkGameOver();
    };

    return { character, enemy, attackEnemy };
};
