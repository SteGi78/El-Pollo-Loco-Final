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
    }
    runInterval = null;

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
     * Function to manage the animations and movements.
     */
    animate() {
        this.runInterval = setInterval(() => {
            if(this.isDead()){
                this.stopAnimation();
                this.loadImage(this.IMG_DEAD);
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_ATTACKING, 120);      

    }
    
    /**
     * Function to clear all running animations.
     */
    destructor() {
        clearInterval(this.runInterval);
        clearInterval(this.animationIntervals);
    }
}