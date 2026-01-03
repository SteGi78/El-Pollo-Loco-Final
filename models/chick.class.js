/**
 * Datei: merge/models/chick.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse Chick.
 * @class
 */
class Chick extends MoveableObject {
    x = 500 + Math.floor(Math.random() * 4500);
    y = 350;
    width = 100;
    height = 80;
    speed = 7 + (Math.random() * 3 + 1);
    energy = 1;
    offset = {
        top: 10,
        bottom: 15,
        left: 15,
        right: 15
    }
    runInterval = null;
    deadHandled = false;

    IMAGES_WALKING =[
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    IMG_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Methode animate.
     * @returns {any}
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
        this.animationIntervals = this.playAnimation(this.IMAGES_WALKING, 125, true);      

    }
    
    /**
     * Methode destructor.
     * @returns {any}
     */
    destructor() {
        clearInterval(this.runInterval);
        clearInterval(this.animationIntervals);
    }
}