/**
 * Datei: merge/models/level.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse Level.
 * @class
 */
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