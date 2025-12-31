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
  this.isDestroyed = true;
  this.character.speed = 0;
  this.character.stopAnimation();
  this.level.endboss[0].speed = 0;

  if (this.level.endboss[0].walkAnimation && !this.level.endboss[0].isDead()) {
    this.level.endboss[0].destructor();
  }

  this.destroyClouds();
  this.destroyCoins();
  this.destroyThrowableObject();
  this.destroyLevelEnemies();
  this.stopLoops();
  pauseAllSounds();
  this.gameOverCelebration(win);
  showGameOverScreen(win);
};

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
};

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
