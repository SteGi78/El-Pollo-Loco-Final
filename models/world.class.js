function getAvailableStatusbarValue(val) {
    const available = [0, 20, 40, 60, 80, 100];
    return Math.max(...available.filter(v => v <= val));
}

/**
 * World (Split)
 *
 * Diese Datei enthält bewusst nur das Klassen-Skeleton + Constructor + shared helper.
 * Logik ist ausgelagert:
 *  - models/world.render.js
 *  - models/world.collision.js
 *  - models/world.loop.js
 *  - models/world.collect.js
 *  - models/world.lifecycle.js
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
     * Helper: Map count (0..max) to StatusBar percentage (0/20/40/60/80/100).
     * Workaround: StatusBar.updateStatusBar nutzt '>' statt '>='.
     * Daher geben wir für 20/40/60/80 jeweils minimal > Wert zurück.
     * @param {number} count
     * @param {number} max
     * @returns {number}
     */
    _barPercentFromCount(count, max) {
        const clamped = Math.max(0, Math.min(count, max));
        const steps = [0, 20, 40, 60, 80, 100];
        const idx = Math.round((clamped / max) * 5);
        const val = steps[Math.max(0, Math.min(5, idx))];

        if (val === 0 || val === 100) return val;
        return val + 0.001;
    }
}
