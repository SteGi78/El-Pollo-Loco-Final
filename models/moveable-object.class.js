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
    deathAnimation = null;
    lastHit = 0;

    /**
     * Function to apply gravity to the moveable object.
     */
    applyGravity() {
        setInterval(() => {
            if (!(this instanceof ThrowableObject)) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
                if (this.y > 180)
                    this.y = 180
            } else {
                this.isBottleSplashed();
            }
        }, 1000 / 25);
    }

    /**
     * Function to check if bottle is splashed.
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
     * Function to check if object is not on the ground.
     * @returns {boolean} - The value is true when object is not on the ground.
     */
    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Function to handle the object animation according to its parameters.
     * @param {Array} arr - The array of images to be animated.
     * @param {number} fps - The frames per second, the interval wished.
     * @param {boolean} moveLeft - The value is true, when the movement to left is wished during animation.
     * @returns {interval} - The interval of the animation
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
     * Function to cancel the animation by clearing its interval.
     * @param {interval} intervalId - The animation interval.
     * @returns {null} - null
     */
    cancelAnimation(intervalId) {
        clearInterval(intervalId);
        return null;
    }

    /**
     * Function to stop the animation by clearing the intervals on the variable animationIntervals.
     */
    stopAnimation() {
        clearInterval(this.animationIntervals);
        this.animationIntervals = null;
    }

    /**
     * Function to move the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Function to move the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Function to check the collision of the object with another object.
     * @param {MoveableObject} mo - The object that is colliding.
     * @returns {boolean} - The value is true when is colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Function to reduce object's energy after a hit and play hurt sound.
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
     * Function to manage the hurt sounds according with its instance.
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
     * Function to control the hits that the object is getting according to the last hit gotten.
     * @returns {boolean} - The value is true if hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Function to check whether the object lost all energy.
     * @returns {boolean} - The value is true when energy <= 0.
     */
    isDead() {
        return this.energy <= 0;
    }
}