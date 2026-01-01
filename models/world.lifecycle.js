// ============================================================
//  World Lifecycle / GameOver / Cleanup
// ============================================================

World.prototype.destroy = function () {
  this.isDestroyed = true;
  this.stopLoops();
  this.destroyClouds();
  this.destroyCoins();
  this.destroyThrowableObject();
  this.destroyLevelEnemies();
  if (this.level?.endboss?.[0]?.destructor) {
    this.level.endboss[0].destructor();
  }
};

World.prototype.gameOver = function (win = true) {
  this._freezeActorsForGameOver();
  this._cleanupWorldForGameOver();
  this._showGameOver(win);
};

World.prototype._resetWorldCounters = function () {
  this.coin_collected = 0;
  this.bottle_collected = 0;
};


World.prototype._destroyWorldEntities = function () {
  this.destroyCharacter();
  this.destroyBars();
  this.destroyCoins();
  this.destroyThrowableObject();
  this.destroyLevelEnemies();
  this.level = [];
};


World.prototype._nullOutWorldRefs = function () {
  this.ctx = null;
  this.canvas = null;
  this.keyboard = null;
};


World.prototype._clearWorldTimers = function () {
  clearInterval(this.runInterval);
  cancelAnimationFrame(this.requestId);
  this.requestId = null;
};


World.prototype._showGameOver = function (win) {
  this.gameOverCelebration(win);
  showGameOverScreen(win);
};


World.prototype._cleanupWorldForGameOver = function () {
  this.destroyClouds();
  this.destroyCoins();
  this.destroyThrowableObject();
  this.destroyLevelEnemies();
  this.stopLoops();
  pauseAllSounds();
};


World.prototype._stopEndbossForGameOver = function () {
  const boss = this.level.endboss[0];
  boss.speed = 0;
  if (boss.walkAnimation && !boss.isDead()) boss.destructor();
};


World.prototype._stopCharacterForGameOver = function () {
  this.character.speed = 0;
  this.character.stopAnimation();
};


World.prototype._freezeActorsForGameOver = function () {
  this.isDestroyed = true;
  this._stopCharacterForGameOver();
  this._stopEndbossForGameOver();
};

;

World.prototype.gameOverCelebration = function (win) {
  if (win) {
    this.character.loadImage("img/2_character_pepe/3_jump/J-35.png");
    playSound(SOUNDS.gameWon, false, 1000);
    playSound(SOUNDS.yes, false, 1000);
  } else {
    playSound(SOUNDS.gameLost, false, 4000);
  }
};

World.prototype.destructor = function () {
  this._clearWorldTimers();
  this._nullOutWorldRefs();
  this._destroyWorldEntities();
  this._resetWorldCounters();
};
;

World.prototype.destroyLevelEnemies = function () {
  this.level.enemies.forEach(enemy => {
    enemy.destructor();
  });
  this.level.endboss[0].destructor();
};

World.prototype.destroyThrowableObject = function () {
  // robust: alle Projektile entfernen, nicht nur [0]
  this.throwableObjects.forEach(o => o?.destructor?.());
  this.throwableObjects = [];
  this.lastBottleThrown = 0;
};

World.prototype.destroyClouds = function () {
  this.level.clouds.forEach(cloud => {
    cloud.destructor();
  });
};

World.prototype.destroyCoins = function () {
  this.level.coins.forEach(coin => {
    coin.destructor();
  });
};

World.prototype.destroyCharacter = function () {
  this.character.destructor();
  this.character = null;
};

World.prototype.destroyBars = function () {
  this.statusBar = null;
  this.coinBar = null;
  this.bottleBar = null;
  this.endBossBar = null;
};
