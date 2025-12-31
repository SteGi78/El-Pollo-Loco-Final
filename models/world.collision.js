// ============================================================
//  World Collisions & Combat (split)
// ============================================================

World.prototype.checkCollisionsWithEnemies = function () {
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
        }
    });
};

World.prototype.isCollisionFromAbove = function (enemy) {
    let enemyHead = enemy.y + enemy.height - enemy.offset.top;
    let characterFoot = this.character.y + this.character.height - this.character.offset.bottom;
    return this.character.afterJump && (enemyHead > characterFoot);
};

World.prototype.enemyDeath = function (index, enemy) {
    // Stop any running animations/intervals first
    if (enemy && typeof enemy.stopAnimation === 'function') enemy.stopAnimation();
    if (enemy && typeof enemy.destructor === 'function') enemy.destructor();

    // Ensure dead sprite is a real path (not an array)
    let deadImg = null;
    if (enemy && Array.isArray(enemy.IMG_DEAD)) deadImg = enemy.IMG_DEAD[0];
    else if (enemy && enemy.IMG_DEAD) deadImg = enemy.IMG_DEAD;

    if (deadImg) enemy.loadImage(deadImg);

    // Remove the enemy from the level after a short delay
    setTimeout(() => {
        const currentIndex = this.level.enemies.indexOf(enemy);
        if (currentIndex > -1) this.level.enemies.splice(currentIndex, 1);
    }, 200);
};

World.prototype.checkCollisionsWithEndboss = function () {
    let endBoss = this.level.endboss[0];
    if (endBoss.isColliding(this.character)) {
        this.character.takingHit();
        this.character.updateStatusBar();
        endBoss.collisionPause();
        endBoss.isAttacking();
    }
};

World.prototype.checkBottleCollided = function () {
    this.throwableObjects.forEach(bottle => {
        if (!bottle.isSplashed) {
            if (this.level.endboss[0].isColliding(bottle) && !bottle.hasCollided) {
                this.level.endboss[0].hit();
                if (typeof this.level.endboss[0].updateStatusBar === 'function') this.level.endboss[0].updateStatusBar();
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
};

World.prototype.shatterBottle = function (bottle) {
    bottle.isSplashed = true;
    bottle.hasCollided = true;
    playSound('bottleSplash');
};

World.prototype.checkBottleSplashed = function () {
    this.throwableObjects.forEach((bottle) => {
        if (!bottle.isSplashed) return;

        // Entfernen erst nach Splash-Animation. Index immer "live" bestimmen.
        setTimeout(() => {
            const i = this.throwableObjects.indexOf(bottle);
            if (i > -1) {
                if (typeof bottle.destructor === 'function') bottle.destructor();
                this.throwableObjects.splice(i, 1);
            }
        }, 700);
    });
};

World.prototype.checkDeathsAfterCollision = function () {
    if (this.level.endboss[0].isDead()) {
        playSound(SOUNDS.bossDead, false, 1000);
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
};

World.prototype.checkEnemiesDeaths = function () {
    for (const enemy of this.level.enemies) {
        if (enemy.isDead() && !enemy.deathAnimation) {
            const index = this.level.enemies.indexOf(enemy);
            enemy.deathAnimation = true;
            this.enemyDeath(index, enemy);
            break;
        }
    }
};
