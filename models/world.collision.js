/**
 * Datei: merge/models/world.collision.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

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
  this._stopEnemy(enemy);
  const deadImg = this._getEnemyDeadImage(enemy);
  if (deadImg) enemy.loadImage(deadImg);
  this._scheduleEnemyRemoval(enemy);
};

World.prototype._handleCharacterDeathAfterCollision = function () {
  if (!this.character.isDead()) return false;
  this.level.endboss[0].speed = 0;
  setTimeout(() => this.gameOver(false), 700);
  return true;
};


World.prototype._handleBossDeathAfterCollision = function () {
  if (this.isDestroyed || this._gameOverScheduled) return false;
  if (!this.level.endboss[0].isDead()) return false;

  this._gameOverScheduled = true;
  playSound(SOUNDS.bossDead, false, 1000);
  this.character.speed = 0;
  setTimeout(() => this.gameOver(true), 1000);
  return true;
};


World.prototype._bottleHitsEnemy = function (bottle) {
  for (const enemy of this.level.enemies) {
    if (enemy.isColliding(bottle) && !enemy.isDead() && !bottle.hasCollided) {
      enemy.hit();
      this.shatterBottle(bottle);
      break;
    }
  }
};


World.prototype._bottleHitsEndboss = function (bottle) {
  const boss = this.level.endboss[0];
  if (!boss || !boss.isColliding(bottle) || bottle.hasCollided) return false;
  boss.hit();
  boss.updateStatusBar?.();
  this.shatterBottle(bottle);
  return true;
};


World.prototype._checkBottleCollision = function (bottle) {
  if (bottle.isSplashed || bottle.hasCollided) return;
  if (this._bottleHitsEndboss(bottle)) return;
  this._bottleHitsEnemy(bottle);
};


World.prototype._scheduleEnemyRemoval = function (enemy) {
  setTimeout(() => {
    const idx = this.level.enemies.indexOf(enemy);
    if (idx > -1) this.level.enemies.splice(idx, 1);
  }, 200);
};


World.prototype._getEnemyDeadImage = function (enemy) {
  if (!enemy) return null;
  if (Array.isArray(enemy.IMG_DEAD)) return enemy.IMG_DEAD[0] || null;
  return enemy.IMG_DEAD || null;
};


World.prototype._stopEnemy = function (enemy) {
  if (enemy && typeof enemy.stopAnimation === "function") enemy.stopAnimation();
  if (enemy && typeof enemy.destructor === "function") enemy.destructor();
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
  for (const bottle of this.throwableObjects) this._checkBottleCollision(bottle);
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
  if (this._handleBossDeathAfterCollision()) return;
  if (this._handleCharacterDeathAfterCollision()) return;
  if (this.level.enemies.length > 0) this.checkEnemiesDeaths();
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
