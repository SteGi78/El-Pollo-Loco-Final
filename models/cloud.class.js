/**
 * Datei: merge/models/cloud.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse Cloud.
 * @class
 */
class Cloud extends MoveableObject {
    y = 10;
    width = 800;
    height = 400;
    speed = 0.25;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/"+ this.randomCloud() + ".png");
        this.x = Math.random() * 5100;
        this.animate();
    }

    /**
     * Methode animate.
     * @returns {void}
     */
    animate() {
        this.animationIntervals = setInterval(()=> {
         this.moveLeft();
         if(this.x < -1000)
            this.x = 6000;
        }, 1000/60);  
     }

     /**
      * Methode randomCloud.
      * @returns {void}
      */
     randomCloud() {
        return Math.floor(Math.random()*2 + 1);
    }

    /**
     * Methode destructor.
     * @returns {void}
     */
    destructor() {
        clearInterval(this.animationIntervals);
    }
}