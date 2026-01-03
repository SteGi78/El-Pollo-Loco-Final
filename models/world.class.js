/**
 * Datei: merge/models/world.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse World.
 * @class
 */
class World {
    ctx;
    canvas;
    keyboard;

    character = new Character(this);
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    coin_collected = 0;

    // Feedback: Bars sollen logisch und „stabil“ wirken.
    // Wir koppeln die Anzeige an ein sauberes 0..5-System (0/20/40/60/80/100).
    MAX_COINS = 5;

    bottleBar = new BottleBar();
    bottle_collected = 0;
    MAX_BOTTLES = 5;

    endBossBar = new EndbossBar();

    throwableObjects = [];
    lastBottleThrown = 0;

    level = level1;
    cam_x = -100;

    runInterval = null;
    requestId = null;
    isDestroyed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        // Original-Reihenfolge beibehalten
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Methode _barPercentFromCount.
     * @param {number} count - Parameter.
     * @param {unknown} max - Parameter.
     * @returns {void}
     */
    _barPercentFromCount(count, max) {
        const m = Math.max(1, Number(max) || 1);
        const c = Math.max(0, Math.min(Number(count) || 0, m));
        return (c / m) * 100;
    }
}
