let level1;

/**
 * Function represents the game level from background until enemies.
 */
function initLevel(){
    level1 = new Level(enemies = [
        new Snake(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Snake(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Snake(),
        new Chicken(),
        new Chicken(),
        new Snake(),
        new Chick(),
        new Chicken(),
        new Chicken()
    ],
    
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    
    backgroundObjects = [
        new BackgroundObject("img/5_background/layers/air.png", -719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png", 719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 5),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 7),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 7),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 7),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 7),
    ],

    endboss = [
        new Endboss()
    ],

    bottles =[
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],

    coins = [
        new Coin(200, 150),
        new Coin(1000, 100),
        new Coin(1850, 75),
        new Coin(2750, 50),
        new Coin(4000, 50)
    ]);    
}