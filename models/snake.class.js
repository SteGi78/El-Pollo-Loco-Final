/**
 * Datei: merge/models/snake.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse Snake.
 * @class
 */
class Snake extends MoveableObject {
    x = 500 + Math.floor(Math.random() * 4500);
    y = 350;
    height = 80;
    width = 70;
    speed = 0;
    energy = 1;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    runInterval = null;
    deadHandled = false;

    IMAGES_ATTACKING = [
        "img/3_enemie_snake/2_attack/1_a.png",
        "img/3_enemie_snake/2_attack/2_a.png",
        "img/3_enemie_snake/2_attack/3_a.png",
        "img/3_enemie_snake/2_attack/4_a.png",
        "img/3_enemie_snake/2_attack/5_a.png",
        "img/3_enemie_snake/2_attack/6_a.png"
    ];

    IMG_DEAD = ["img/3_enemie_snake/3_dead/dead.png"];

    constructor() {
        super().loadImage("img/3_enemie_snake/2_attack/1_a.png");
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
    }

    /**
     * Methode animate.
     * @returns {void}
     */
    animate() {
        this.runInterval = setInterval(() => {
            if (this.isDead() && !this.deadHandled) {
                this.deadHandled = true;
                this.stopAnimation();
                this.speed = 0;
                this.loadImage(this.IMG_DEAD[0]);
                clearInterval(this.runInterval);
            }
        }, 150);

        this.animationIntervals = this.playAnimation(this.IMAGES_ATTACKING, 120);
    }

    /**
     * Methode destructor.
     * @returns {void}
     */
    destructor() {
        clearInterval(this.runInterval);
        clearInterval(this.animationIntervals);
    }
}
