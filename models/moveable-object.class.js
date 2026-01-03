/**
 * Datei: merge/models/moveable-object.class.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

/**
 * Klasse MoveableObject.
 * @class
 */
class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    energy = 1;
    speed;
    speedY = 0;
    acceleration = 5;
    otherDirection = false;
    animationIntervals = null;
    gravityInterval = null;
    deathAnimation = null;
    lastHit = 0;

    /**
     * Methode applyGravity.
     * @returns {any}
     */
    applyGravity() {
    this.clearGravityInterval();
    this.gravityInterval = setInterval(this.gravityTick.bind(this), 1000 / 25);
  }

  /**
   * Methode clearGravityInterval.
   * @returns {any}
   */
  clearGravityInterval() {
    if (this.gravityInterval) clearInterval(this.gravityInterval);
  }

  /**
   * Methode gravityTick.
   * @returns {any}
   */
  gravityTick() {
    if (this instanceof ThrowableObject) return this.isBottleSplashed();

    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }

    if (this.y > 180) this.y = 180;
  }

    /**
     * Methode isBottleSplashed.
     * @returns {any}
     */
    isBottleSplashed() {
        /**
         * Methode if.
         * @param {any} !this.isSplashed - Parameter.
         * @returns {any}
         */
        if (!this.isSplashed) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            /**
             * Methode if.
             * @param {any} this.y > - Parameter.
             * @returns {any}
             */
            if(this.y >= 375){
                this.isSplashed = true;
                this.y = 375;
            }
        }
    }

    /**
     * Methode isAboveGround.
     * @returns {any}
     */
    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Methode playAnimation.
     * @param {any} arr - Parameter.
     * @param {any} fps - Parameter.
     * @param {any} moveLeft - Parameter.
     * @returns {any}
     */
    playAnimation(arr, fps, moveLeft = false) {
        const intervalTime = (fps) ? fps : 1000 / 10; 
        const imgs = arr;
        const intervalId = setInterval(() => {
            let i = this.currentImage % imgs.length;
            let path = imgs[i]; 
            this.img = this.imageCache[path];
            this.currentImage++;
            if(moveLeft)
                 this.moveLeft();
        }, intervalTime);
        
        return intervalId;
    }

    /**
     * Methode cancelAnimation.
     * @param {any} intervalId - Parameter.
     * @returns {any}
     */
    cancelAnimation(intervalId) {
        clearInterval(intervalId);
        return null;
    }

    /**
     * Methode stopGravity.
     * @returns {any}
     */
    stopGravity() {
        /**
         * Methode if.
         * @param {any} this.gravityInterval - Parameter.
         * @returns {any}
         */
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
            this.gravityInterval = null;
        }
    }

    /**
     * Methode stopAnimation.
     * @returns {any}
     */
    stopAnimation() {
        clearInterval(this.animationIntervals);
        this.animationIntervals = null;
    }

    /**
     * Methode moveRight.
     * @returns {any}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Methode moveLeft.
     * @returns {any}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Methode isColliding.
     * @param {any} mo - Parameter.
     * @returns {any}
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Methode hit.
     * @returns {any}
     */
    hit() {
        this.hurtSound();
        this.energy -= 10;
        /**
         * Methode if.
         * @param {any} this.energy < - Parameter.
         * @returns {any}
         */
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Methode hurtSound.
     * @returns {any}
     */
    hurtSound(){
        /**
         * Methode if.
         * @param {any} this instanceof Character - Parameter.
         * @returns {any}
         */
        if(this instanceof Character) {
            if (!this.isDead())
                playSound('hurt');
        }else if(this instanceof Chicken || this instanceof Endboss) {
            playSound('chickenHurt');
        }else if(this instanceof Chick) {
            playSound('chickHurt');
        }else if(this instanceof Snake){
            playSound('snakeHurt');
        }
    }

    /**
     * Methode isHurt.
     * @returns {any}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Methode isDead.
     * @returns {any}
     */
    isDead() {
        return this.energy <= 0;
    }
}
