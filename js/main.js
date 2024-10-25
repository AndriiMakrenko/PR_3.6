import { initializeGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const { attackEnemy } = initializeGame();

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
