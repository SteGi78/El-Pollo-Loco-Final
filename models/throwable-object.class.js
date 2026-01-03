/**
 * Datei: merge/models/throwable-object.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse ThrowableObject.
 * @class
 */
class ThrowableObject extends MoveableObject {
    width = 80;
    height = 70;
    speed = 40;
    isSplashed = false;
    hasCollided = false;
    throwInterval = null;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"

    ];

    constructor(x, y, otherDirection) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw(otherDirection);
        this.animate();
    }

    /**
     * Methode throw.
     * @param {unknown} otherDirection - Parameter.
     * @returns {void}
     */
    throw(otherDirection) {
        this.speedY = 30;
        this.throwingOtherDirection = otherDirection;
        this.speed = 50;
        this.applyGravity();
        this.startThrowInterval();
    }

    /**
     * Methode startThrowInterval.
     * @returns {void}
     */
    startThrowInterval() {
        if (this.throwInterval) clearInterval(this.throwInterval);
        this.throwInterval = setInterval(this.throwTick.bind(this), 60);
    }

    /**
     * Methode throwTick.
     * @returns {void}
     */
    throwTick() {
        if (this.isSplashed) return this.animateSplash();
        if (this.throwingOtherDirection) return this.moveLeft();
        this.moveRight();
    }

    /**
     * Methode animate.
     * @returns {void}
     */
    animate() {
        this.animationIntervals = this.playAnimation(this.IMAGES_ROTATION, 50);
    }

     /**
      * Methode animateSplash.
      * @returns {void}
      */
     animateSplash() {
        this.stopAnimation();
        this.animationIntervals = this.playAnimation(this.IMAGES_SPLASH, 25);
    }

    /**
     * Methode destructor.
     * @returns {void}
     */
    destructor() {
        clearInterval(this.animationIntervals);
        /**
         * Methode if.
         * @param {unknown} this.throwInterval - Parameter.
         * @returns {void}
         */
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if (typeof this.stopGravity === 'function') this.stopGravity();
    }
}
