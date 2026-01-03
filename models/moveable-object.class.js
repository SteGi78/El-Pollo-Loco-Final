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
     * @returns {void}
     */
    applyGravity() {
    this.clearGravityInterval();
    this.gravityInterval = setInterval(this.gravityTick.bind(this), 1000 / 25);
  }

  /**
   * Methode clearGravityInterval.
   * @returns {void}
   */
  clearGravityInterval() {
    if (this.gravityInterval) clearInterval(this.gravityInterval);
  }

  /**
   * Methode gravityTick.
   * @returns {void}
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
     * @returns {void}
     */
    isBottleSplashed() {
        if (!this.isSplashed) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if(this.y >= 375){
                this.isSplashed = true;
                this.y = 375;
            }
        }
    }

    /**
     * Methode isAboveGround.
     * @returns {boolean}
     */
    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Methode playAnimation.
     * @param {string[]} arr - Parameter.
     * @param {number} fps - Parameter.
     * @param {boolean} moveLeft - Parameter.
     * @returns {number}
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
     * @param {number} intervalId - Parameter.
     * @returns {null}
     */
    cancelAnimation(intervalId) {
        clearInterval(intervalId);
        return null;
    }

    /**
     * Methode stopGravity.
     * @returns {void}
     */
    stopGravity() {
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
            this.gravityInterval = null;
        }
    }

    /**
     * Methode stopAnimation.
     * @returns {void}
     */
    stopAnimation() {
        clearInterval(this.animationIntervals);
        this.animationIntervals = null;
    }

    /**
     * Methode moveRight.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Methode moveLeft.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Methode isColliding.
     * @param {MoveableObject} mo - Parameter.
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Methode hit.
     * @returns {void}
     */
    hit() {
        this.hurtSound();
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Methode hurtSound.
     * @returns {void}
     */
    hurtSound(){
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
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Methode isDead.
     * @returns {boolean}
     */
    isDead() {
        return this.energy <= 0;
    }
}
