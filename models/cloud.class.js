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
     * Function to manage the movements.
     */
    animate() {
        this.animationIntervals = setInterval(()=> {
         this.moveLeft();
         if(this.x < -1000)
            this.x = 6000;
        }, 1000/60);  
     }

     /**
     * Function to select dinamically between both types of clouds.
     * @returns {number} - The value is 1 or 2.
     */
     randomCloud() {
        return Math.floor(Math.random()*2 + 1);
    }

    /**
     * Function to clear the running animation.
     */
    destructor() {
        clearInterval(this.animationIntervals);
    }
}