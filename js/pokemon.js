export class Pokemon {
    constructor(name, image, maxHealth, attackPower, healthBar, healthText) {
        this.name = name;
        this.image = image;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.attackPower = attackPower;
        this.healthBar = healthBar;
        this.healthText = healthText;
    }

    renderProgressbarHP() {
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.healthBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;

        this.healthBar.classList.remove('low', 'critical');

        if (this.health <= this.maxHealth * 0.2) {
            this.healthBar.classList.add('critical');
        } else if (this.health <= this.maxHealth * 0.6) {
            this.healthBar.classList.add('low');
        }
    }

    receiveDamage(damage) {
        this.health = Math.max(0, this.health - damage);
        this.renderProgressbarHP();
        return `${this.name} получил урон: ${damage}`;
    }
}
