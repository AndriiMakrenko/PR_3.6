export class Pokemon {
    constructor(name, health, maxHealth, progressBar, healthText) {
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth;
        this.progressBar = progressBar;
        this.healthText = healthText;
    }

    updateHealthBar() {
        this.health = Math.max(this.health, 0);
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }

    receiveDamage(damage) {
        this.health -= damage;
        this.updateHealthBar();
        return `${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`;
    }
}
