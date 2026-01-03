/**
 * Datei: merge/models/coin.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse Coin.
 * @class
 */
class Coin extends MoveableObject {
    width = 100;
    height = 100;

    offset = {
        top: 35,
        bottom: 35,
        left: 33,
        right: 40
    };

    IMAGES_COIN = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];
    

    constructor(x, y) {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = x + 450;
        this.y = Math.floor(y * Math.random()) + (Math.floor(Math.random() * 10) + 1) + 30;
        this.animate();
    }

    /**
     * Methode animate.
     * @returns {any}
     */
    animate() {
        this.animationIntervals = this.playAnimation(this.IMAGES_COIN, 200);
    }

    /**
     * Methode destructor.
     * @returns {any}
     */
    destructor() {
        clearInterval(this.animationIntervals);
    }
}