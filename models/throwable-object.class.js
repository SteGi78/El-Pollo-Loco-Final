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
     * Function to throw the object to the left or to the right.
     * @param {boolean} otherDirection - The value is true if the character is moving left.
     */
    throw(otherDirection) {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if(!this.isSplashed) {
                if(otherDirection){
                    this.speed = 50;
                    this.moveLeft();
                } else {
                    this.moveRight();
                }
            }else {
                this.animateSplash();
            }
        }, 60);
    }

    /**
     * Function to manage the rotation animation.
     */
    animate() {
        this.animationIntervals = this.playAnimation(this.IMAGES_ROTATION, 50);
    }

     /**
     * Function to manage the splash animation.
     */
    animateSplash() {
        this.stopAnimation();
        this.animationIntervals = this.playAnimation(this.IMAGES_SPLASH, 25);
    }

    /**
     * Function to clear all running animations.
     */
    destructor() {
        clearInterval(this.animationIntervals);
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if (typeof this.stopGravity === 'function') this.stopGravity();
    }
}