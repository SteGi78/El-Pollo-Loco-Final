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
     * Function to manage the animations and movements.
     */
    animate() {
        this.runInterval = setInterval(() => {
            if(this.isDead()){
                this.stopAnimation();
                this.speed = 0;
                this.loadImage(this.IMG_DEAD);
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_WALKING, 125, true);      

    }
    
    /**
     * Function to clear all running animations.
     */
    destructor() {
        clearInterval(this.runInterval);
        clearInterval(this.animationIntervals);
    }
}