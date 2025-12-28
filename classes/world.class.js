
function getAvailableStatusbarValue(val) {
    const available = [0, 20, 40, 60, 80, 100];
    return Math.max(...available.filter(v => v <= val));
}
class World {
    ctx;
    canvas;
    keyboard;
    character = new Character(this);
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    coin_collected = 0;
    bottleBar = new BottleBar();
    bottle_collected = 0;
    endBossBar = new EndbossBar();
    throwableObjects = [];
    lastBottleThrown = 0;
    level = level1;
    cam_x = -100;
    runInterval = null;
    requestId = null;
    isDestroyed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Function to draw the entire game.
     */
    draw() {
        if (this.isDestroyed) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cam_x, 0);
        this.drawBasicObjs();
        this.drawFixedObjs();
        this.drawEnemies();
        this.drawCollectableObjs();
        this.ctx.translate(-this.cam_x, 0);
        this.requestId = requestAnimationFrame(() => {
            this.draw();
            this.checkOtherDirection();
        });
    }

    /**
     * Function to draw the backgrounds, clouds, character and throwable objects.
     */
    drawBasicObjs() {
        this.addObjsToMap(this.level.backgroundObjects);
        this.addObjsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjsToMap(this.throwableObjects);
    }

    /**
     * Function to draw fixed objects, the status bars.
     */
    drawFixedObjs() {
        this.ctx.translate(-this.cam_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (!this.isCharacterTooFar(this.level.endboss[0])) {
            this.addToMap(this.endBossBar);
        }
        this.ctx.translate(this.cam_x, 0);
    }

    /**
     * Function to draw the collectable objects.
     */
    drawCollectableObjs() {
        this.addObjsToMap(this.level.bottles);
        this.addObjsToMap(this.level.coins);
    }

    /**
     * Function to check if the character is far from end boss.
     * @param {MoveableObject} endBoss - The end boss.
     * @returns {boolean} - The value is false when the character is close to the end boss.
     */
    isCharacterTooFar(endBoss) {
        return this.character.x + 590 < endBoss.x;
    }

    /**
     * Function to draw the enemies and end boss.
     */
    drawEnemies() {
        this.addObjsToMap(this.level.enemies);
        this.addObjsToMap(this.level.endboss);
    }

    /**
     * Function to add multiple objects to map.
     * @param {Array} objs - The array of objects.
     */
    addObjsToMap(objs) {
        objs.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Function to add object to map.
     * @param {DrawableObject} mo - The object.
     */
    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);

            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    /**
     * Function to flip the character.
     * @param {MoveableObject} mo - The object character.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }

    /**
     * Function to flip the character back.
     * @param {MoveableObject} mo - The object character.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Function to check if the character is moving to the left, the other direction.
     */
    checkOtherDirection() {
        if (this.keyboard.LEFT && !this.character.speed == 0)
            this.character.otherDirection = true;

        if (this.keyboard.RIGHT && !this.character.speed == 0)
            this.character.otherDirection = false;
    }

    /**
     * Function to set the world by end boss.
     */
    setWorld() {
        this.level.endboss[0].world = this;
    }

    /**
     * Function to run the game by checking conditions.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisionsWithEnemies();
            this.checkCollisionsWithEndboss();
            this.checkThrowObjects();
            this.checkBottleCollided();
            this.checkBottleSplashed();
            this.checkDeathsAfterCollision();
            this.collectingBottle();
            this.collectingCoin();
            this.checkBossEscaping();
        }, 1000 / 60);
    }

    /**
     * Stops animation and interval loops to prevent multiple worlds running.
     */
    stopLoops() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
        if (this.runInterval) {
            clearInterval(this.runInterval);
            this.runInterval = null;
        }
    }

    /**
     * Cleanly tear down the world and its entities.
     */
    destroy() {
        this.isDestroyed = true;
        this.stopLoops();
        this.destroyClouds();
        this.destroyCoins();
        this.destroyThrowableObject();
        this.destroyLevelEnemies();
        if (this.level?.endboss?.[0]?.destructor) {
            this.level.endboss[0].destructor();
        }
    }

    /**
     * Function to check if enemies are colliding with character.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isColliding(this.character) && !enemy.isDead()) {
                if (this.isCollisionFromAbove(enemy)) {
                    this.character.afterJump = false;
                    enemy.hit();
                    this.character.jump();
                } else {
                    this.character.takingHit();
                    this.character.updateStatusBar();
                }
            } else
                return false;
        });
    }

    /**
     * Function to check if enemies are colliding from above.
     * @param {MoveableObject} enemy - The object enemy.
     * @returns {boolean} - The value is true if character is above enemy head.
     */
    isCollisionFromAbove(enemy) {
        let enemyHead = enemy.y + enemy.height - enemy.offset.top;
        let characterFoot = this.character.y + this.character.height - this.character.offset.bottom;
        return this.character.afterJump && (enemyHead > characterFoot);
    }

    /**
     * Function to check if enemies are colliding from above.
     * @param {number} index - The index of enemy in the array of enemies.
     * @param {MoveableObject} enemy - The object enemy.
     */
    enemyDeath(index, enemy) {
        enemy.stopAnimation();
        enemy.loadImage(enemy.IMG_DEAD);
        setTimeout(() => {
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 200);
    }

    /**
     * Function to check if end boss is colliding with character.
     */
    checkCollisionsWithEndboss() {
        let endBoss = this.level.endboss[0];
        if (endBoss.isColliding(this.character)) {
            this.character.takingHit();
            this.character.updateStatusBar();
            endBoss.collisionPause();
            endBoss.isAttacking();
        }
    }

    /**
     * Function to throw objects when is possible.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrowObject()) {
            let x = (!this.character.otherDirection) ? this.character.x + this.character.width - this.character.offset.right - 40 : this.character.x + this.character.offset.left - 40;
            let y = this.character.y + this.character.offset.top;
            let bottle = new ThrowableObject(x, y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.lastBottleThrown = new Date().getTime();
            playSound('bottleThrow');
            this.bottle_collected--;
            this.downgradeBottleBar();
        }
    }

    /**
     * Function to downgrade bottle bar.
     */
    downgradeBottleBar() {
        let percentage = (this.bottle_collected > 20) ? 100 :
            (this.bottle_collected * 10 / 2 > 30) ? this.bottle_collected * 10 / 2 :
                (this.bottle_collected > 0) ? 30 : 0;
        this.bottleBar.setPercentage(percentage);
    }

    /**
     * Function to check if possible throw next bottle.
     * @returns {boolean} - The value is true when timepassed > 1 and the character still has bottles.
     */
    canThrowObject() {
        let timePassed = new Date().getTime() - this.lastBottleThrown;
        timePassed /= 1000;
        return timePassed > 1 && this.bottle_collected > 0 && !this.character.gettingHit;
    }

    /**
     * Function to check if bottle collided.
     */
    checkBottleCollided() {
        this.throwableObjects.forEach(bottle => {
            if (!bottle.isSplashed) {
                if (this.level.endboss[0].isColliding(bottle) && !bottle.hasCollided) {
                    this.level.endboss[0].hit();
                    this.shatterBottle(bottle);
                } else {
                    this.level.enemies.forEach(enemy => {
                        if (enemy.isColliding(bottle) && !enemy.isDead() && !bottle.hasCollided) {
                            enemy.hit();
                            this.shatterBottle(bottle);
                        }
                    });
                }
            }
        });
    }

    /**
     * Function to shatter the botlle.
     * @param {ThrowableObject} bottle - The bottle. 
     */
    shatterBottle(bottle) {
        bottle.isSplashed = true;
        bottle.hasCollided = true;
        playSound('bottleSplash');
    }

    /**
     * Function to check if the bottle splashed. 
     */
    checkBottleSplashed() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isSplashed) {
                playSound('bottleSplash');
                const index = this.throwableObjects.indexOf(bottle);
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 90);
            }
        });
    }

    /**
     * Function to check deaths after collision. 
     */
    checkDeathsAfterCollision() {
        if (this.level.endboss[0].isDead()) {
            playSound(SOUNDS.bossDead, true, 1000);
            this.character.speed = 0;
            setTimeout(() => {
                this.gameOver();
            }, 1000);
        } else if (this.character.isDead()) {
            this.level.endboss[0].speed = 0;
            setTimeout(() => {
                this.gameOver(false);
            }, 700);
        } else if (this.level.enemies.length > 0) {
            this.checkEnemiesDeaths();
        }   
    }

    /**
     * Function to check deaths of enemies. 
     */
    checkEnemiesDeaths() {
        for (const enemy of this.level.enemies) {
            if (enemy.isDead() && !enemy.deathAnimation) {
                const index = this.level.enemies.indexOf(enemy);
                enemy.deathAnimation = true;
                this.enemyDeath(index, enemy);
                break;
            }
        }
    }

    /**
     * Function to check if the end boss escapes. 
     */
    checkBossEscaping() {
        if ((this.level.endboss[0].x < -200 && this.character.x >= 100) ||
            (this.character.x - this.level.endboss[0].x > 1000) ||
            this.allBottlesUsed()) {
            this.gameOver(false);
        }
    }

    /**
     * Function to check if all bottles are used.
     * @param {ThrowableObject} bottle - The bottle. 
     * @returns {boolean} - The value is true when all bottles are used.
     */
    allBottlesUsed() {
        return this.throwableObjects.length == 0 && this.bottle_collected == 0 && this.level.bottles.length == 0;
    }

    /**
     * Function to show the game over screen after stop all animations.
     * @param {boolean} win - The value is true when end boss is dead.
     */
    gameOver(win = true) {
        this.isDestroyed = true;
        this.character.speed = 0;
        this.character.stopAnimation();
        this.level.endboss[0].speed = 0;
        if (this.level.endboss[0].walkAnimation && !this.level.endboss[0].isDead())
            this.level.endboss[0].destructor();
        this.destroyClouds();
        this.destroyCoins();
        this.destroyThrowableObject();
        this.destroyLevelEnemies();
        this.stopLoops();
        pauseAllSounds();
        this.gameOverCelebration(win);
        showGameOverScreen(win);
    }

    /**
    * Function to play game won or game lost audio. In case of a win, the character is set with a winning pose.
    * @param {boolean} win - The value is true when end boss is dead.
    */
    gameOverCelebration(win) {
        if (win) {
            this.character.loadImage("img/2_character_pepe/3_jump/J-35.png");
            playSound(SOUNDS.gameWon, true, 1000);
            playSound(SOUNDS.yes, true, 1000);
        } else
            playSound(SOUNDS.gameLost, true, 4000);
    }

    /**
    * Function to check if the character is collecting bottle.
    */
    collectingBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                playSound('bottleCollect');
                this.bottleCollected(bottle);
            }
        })
    }

    /**
    * Function to check which bottle is collected.
    * @param {Bottle} bottle - The bottle.
    */
    bottleCollected(bottle) {
        this.level.bottles.forEach((item, index) => {
            if (item === bottle) {
                this.level.bottles.splice(index, 1);
                this.bottle_collected++;
                this.updateBottleBar();
            }
        });
    }

    /**
    * Function to update bottle bar.
    */
    updateBottleBar() {
        let percentage = (this.bottle_collected > 0 && this.bottle_collected < 6) ? 30 :
            (this.bottle_collected * 10 / 2 < 100) ? this.bottle_collected * 10 / 2 :
                (this.bottle_collected < 23) ? 90 : 100;
        this.bottleBar.setPercentage(percentage);
    }

    /**
     * Function to check if the character is collecting coin.
     */
    collectingCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                playSound('coin');
                this.coinCollected(coin);
            }
        })
    }

    /**
    * Function to check which coin is collected.
    * @param {Coin} coin - The coin.
    */
    coinCollected(coin) {
        this.level.coins.forEach((item, index) => {
            if (item === coin) {
                this.level.coins.splice(index, 1);
                this.coin_collected++;
                this.updateCoinBar();
            }
        });
    }

    /**
     * Function to update coin bar.
     */
    updateCoinBar() {
        let percentage = (this.coin_collected > 0 && this.coin_collected < 6) ? 30 :
            (this.coin_collected * 10 / 2 < 100) ? this.coin_collected * 10 / 2 :
                (this.coin_collected < 20) ? 90 : 100;
        this.coinBar.setPercentage(percentage);
    }

    /**
     * Function to clear all running animations and reset all variables of world.
     */
    destructor() {
        clearInterval(this.runInterval);
        cancelAnimationFrame(this.requestId);
        this.requestId = null;
        this.ctx = null;
        this.canvas = null;
        this.keyboard = null;
        this.destroyCharacter();
        this.destroyBars();
        this.destroyCoins();
        this.coin_collected = 0;
        this.bottle_collected = 0;
        this.destroyThrowableObject();
        this.destroyLevelEnemies();
        this.level = [];
    }

    /**
     * Function to clear all running animations of all enemies.
     */
    destroyLevelEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.destructor();
        });
        this.level.endboss[0].destructor();
    }

    /**
     * Function to clear all running animations of throwable object.
     */
    destroyThrowableObject() {
        if (this.throwableObjects[0])
            this.throwableObjects[0].destructor();
        this.throwableObjects = [];
        this.lastBottleThrown = 0;
    }

    /**
    * Function to clear the running animation of clouds.
    */
    destroyClouds() {
        this.level.clouds.forEach(cloud => {
            cloud.destructor();
        });
    }

    /**
    * Function to clear the running animation of clouds.
    */
    destroyCoins() {
        this.level.coins.forEach(coin => {
            coin.destructor();
        });
    }
    
     /**
     * Function to clear all running animations of character and set it null.
     */
    destroyCharacter() {
        this.character.destructor();
        this.character = null;
    }

    /**
     * Function to set all bars null.
     */
    destroyBars() {
        this.statusBar = null;
        this.coinBar = null;
        this.bottleBar = null;
        this.endBossBar = null;
    }
}
