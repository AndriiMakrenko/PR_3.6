import { initializeGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    let gameStarted = false;
    let gameObjects = null;

    const pokemonList = [
        {
            name: 'Bulbasaur',
            image: './assets/images-removebg-preview.png',
            maxHealth: 100,
            attackPower: 8
        },
        {
            name: 'Charmander',
            image: './assets/Charmander.png',
            maxHealth: 100,
            attackPower: 12
        },
        {
            name: 'Squirtle',
            image: './assets/007.png',
            maxHealth: 100,
            attackPower: 9
        }
    ];

   
    const getRandomOpponent = () => {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        return pokemonList[randomIndex];
    };

    const startGame = () => {
        if (gameStarted) return;

        const playerPokemon = {
            name: 'Pikachu',
            image: './assets/png-transparent-pikachu-art-t-shirt-pikachu-mammal-vertebrate-computer-wallpaper.png',
            maxHealth: 100,
            attackPower: 10
        };

     
        const enemyPokemon = getRandomOpponent();

        
        gameObjects = initializeGame(playerPokemon, enemyPokemon);
        const { attackEnemy, character, enemy } = gameObjects;

     
        document.getElementById('name-character').textContent = playerPokemon.name;
        document.getElementById('name-enemy').textContent = enemyPokemon.name;
        document.getElementById('progressbar-character').style.width = '100%';
        document.getElementById('progressbar-enemy').style.width = '100%';
        document.getElementById('health-character').textContent = `${playerPokemon.maxHealth} / ${playerPokemon.maxHealth}`;
        document.getElementById('health-enemy').textContent = `${enemyPokemon.maxHealth} / ${enemyPokemon.maxHealth}`;
        document.querySelector('.pokemon.character img').src = playerPokemon.image;
        document.querySelector('.pokemon.enemy img').src = enemyPokemon.image;

    
        document.getElementById('btn-kick').style.display = 'inline-block';
        document.getElementById('btn-harm').style.display = 'inline-block';
        document.getElementById('btn-extra-harm').style.display = 'inline-block';

        document.getElementById('btn-start-game').style.display = 'none';
        document.getElementById('btn-restart-game').style.display = 'inline-block';

        gameStarted = true;


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
    };

    const restartGame = () => {
        location.reload();
    };

    document.getElementById('btn-start-game').addEventListener('click', startGame);
    document.getElementById('btn-restart-game').addEventListener('click', restartGame);

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
});


