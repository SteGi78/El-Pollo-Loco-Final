/**
 * Datei: merge/models/world.collect.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

// ============================================================
//  World Collect / Bars
// ============================================================

World.prototype.collectingBottle = function () {
  if (this.bottle_collected >= this.MAX_BOTTLES) return;

  this.level.bottles.forEach((bottle) => {
    if (this.character.isColliding(bottle) && this.bottle_collected < this.MAX_BOTTLES) {
      playSound('bottleCollect');
      this.bottleCollected(bottle);
    }
  });
};

World.prototype.bottleCollected = function (bottle) {
  if (this.bottle_collected >= this.MAX_BOTTLES) return;

  const idx = this.level.bottles.indexOf(bottle);
  if (idx > -1) {
    this.level.bottles.splice(idx, 1);
    this.bottle_collected++;
    this.updateBottleBar();
  }
};

World.prototype.updateBottleBar = function () {
  const pct = this._barPercentFromCount(this.bottle_collected, this.MAX_BOTTLES);
  this.bottleBar.setPercentage(pct);
};

World.prototype.collectingCoin = function () {
  if (this.coin_collected >= this.MAX_COINS) return;

  this.level.coins.forEach((coin) => {
    if (this.character.isColliding(coin) && this.coin_collected < this.MAX_COINS) {
      playSound('coin');
      this.coinCollected(coin);
    }
  });
};

World.prototype.coinCollected = function (coin) {
  if (this.coin_collected >= this.MAX_COINS) return;

  const idx = this.level.coins.indexOf(coin);
  if (idx > -1) {
    this.level.coins.splice(idx, 1);
    this.coin_collected++;
    this.updateCoinBar();
  }
};

World.prototype.updateCoinBar = function () {
  const pct = this._barPercentFromCount(this.coin_collected, this.MAX_COINS);
  this.coinBar.setPercentage(pct);
};
