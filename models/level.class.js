class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    bottles;
    coins;
    level_end_x = 5100;

    constructor(enemies, clouds, backgroundObjects, endboss, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }
}