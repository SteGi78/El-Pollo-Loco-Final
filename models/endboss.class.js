
function getAvailableStatusbarValue(val) {
    const available = [0, 20, 40, 60, 80, 100];
    return Math.max(...available.filter(v => v <= val));
}
class Endboss extends MoveableObject {
    x = 5500;
    y = 60;
    width = 400;
    height = 390;
    booster = 1;
    speed = 20;
    energy = 100;
    walkAnimation = null;
    hurtAnimation = null;
    attackAnimation = null;
    bossIntro = false;
    offset = {
        top: 20,
        bottom: 20,
        left: 50,
        right: 70
    };
    world;
    runInterval;

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Function to manage the animations and movements.
     */
    animate() {
        this.runInterval = setInterval(() => {
            if(this.isDead()){
                this.runDeathConditions();
            }else if(this.isHurt() && this.newHit()) {
                this.runHurtConditions();
            }else if(!this.world.isCharacterTooFar(this) && !this.bossIntro) {
                this.runIntroConditions();
            }else if(this.isColliding(this.world.character) && !this.isDead()) {
                this.isAttacking();
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_ALERT, 500);
    }

    /**
     * Function to handle the walking animation.
     */
    isWalking() {
        if(this.animationIntervals)
            this.stopAnimation();
        if (!this.walkAnimation) {
            this.walkAnimation = this.playAnimation(this.IMAGES_WALKING, false, true);
        }
    }

    /**
     * Function to pause the end boss when it is colliding.
     */
    collisionPause() {
        this.speed = 0;
    }

    /**
     * Function to restore the end boss after collision pause.
     */
    restoreSpeed(){
        this.speed = 20 + this.booster;
    }

    /**
     * Function to handle the hurting animation.
     */
    isHurting() {
        if(!this.hurtAnimation && !this.isDead()) {
            this.cancelAllAnimations();
            this.hurtAnimation = this.playAnimation(this.IMAGES_HURT, 200);
            setTimeout(() => {
                this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
                if (!this.isDead()) {
                    this.restoreSpeed();
                    this.isWalking();
                    this.booster += 15;
                }  
            }, 1200);
        }
    }

    /**
     * Function to handle the attacking animation.
     */
    isAttacking() {
        if (!this.attackAnimation) {
            this.cancelAllAnimations();
            if (this.walkAnimation) {
                this.collisionPause();
                this.walkAnimation = this.cancelAnimation(this.walkAnimation);
            }
            this.attackAnimation = this.playAnimation(this.IMAGES_ATTACK, 150);
            this.cancelAttack();
        }
    }

    /**
     * Function to handle the death conditions & animation.
     */
    runDeathConditions() {
        this.speed = 0;
        this.cancelAllAnimations();
        this.updateStatusBar();
        this.endBossDead();
    }

     /**
     * Function to handle the hurting conditions & animation.
     */
    runHurtConditions() {
        this.updateStatusBar();
        this.lastHit = this.energy;
        this.isHurting();
    }

     /**
     * Function to handle the intro conditions & animation.
     */
    runIntroConditions() {
        playSound('bossIntro');
        setTimeout(() => {
            this.bossIntro = true;
            this.isWalking();
        }, 1500);
    }

    /**
     * Function to cancel the attacking animation.
     */
    cancelAttack() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.attackAnimation = this.cancelAnimation(this.attackAnimation);
            if (!this.isDead()) {
                this.restoreSpeed();
                this.isWalking();
            }
        }, 1800);
    }

    /**
     * Function to check if end boss got a new hit.
     * @returns {boolean} - The value is true when energy is reduced.
     */
    newHit() {
        return this.energy != this.lastHit;
    }

    /**
     * Function to cancel all animations except death animation.
     */
    cancelAllAnimations() {
        this.stopAnimation();
        this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
        this.walkAnimation = this.cancelAnimation(this.walkAnimation);
        this.attackAnimation = this.cancelAnimation(this.attackAnimation);
    }

    /**
     * Function to show death animation.
     */
    endBossDead() {
        if (!this.deathAnimation) {
            this.deathAnimation = this.playAnimation(this.IMAGES_DEAD, 150);
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            setTimeout(() => {
                this.cancelAnimation(this.deathAnimation);
                this.loadImage("img/4_enemie_boss_chicken/5_dead/G26.png");
            }, 300);
        }
    }

    /**
     * Function to update status bar according to end boos's energy.
     */
    updateStatusBar() {
        let percentage = (this.energy > 0 && this.energy < 30) ? 30 : this.energy;
        this.world.endBossBar.setPercentage(percentage);
    }

    /**
     * Function to clear all running animations.
     */
    destructor() {
        clearInterval(this.runInterval);
        this.cancelAllAnimations();
    }
}