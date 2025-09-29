
const SOUNDS = {
    bossDead: new Audio("./audio/boss_dead.mp3"),
    bossIntro: new Audio("./audio/boss_intro_sound.mp3"),
    bottleCollect: new Audio("./audio/bottle_collect.mp3"),
    bottleSplash: new Audio("./audio/bottle_shatter.mp3"),
    bottleThrow: new Audio("./audio/bottle_throw.mp3"),
    chickenHurt: new Audio("./audio/chicken_hurt.mp3"),
    chickHurt: new Audio("./audio/small_chicken_hurt.mp3"),
    snakeHurt: new Audio("./audio/snake_hurt.mp3"),
    coin: new Audio("./audio/coin.mp3"),
    gameLost: new Audio("./audio/game_lost.mp3"),
    gameWon: new Audio("./audio/game_won.mp3"),
    game: new Audio("./audio/game.mp3"),
    hurt: new Audio("./audio/hurt.mp3"),
    jump: new Audio("./audio/jump.mp3"),
    walk: new Audio("./audio/walk.mp3"),
    yes: new Audio("./audio/yes.mp3"),
};
let soundMuted = false;
/**
 * Spielt ein Sound-Objekt ab, mit optionalen Parametern.
 * @param {string} name - Name des Sounds.
 * @param {Object} opts - {timeout, time, loop, volume}
 */
function playSound(name, opts = {}) {
    if (soundMuted || !SOUNDS[name]) return;
    const audio = SOUNDS[name];
    if (opts.volume !== undefined) audio.volume = opts.volume;
    audio.loop = !!opts.loop;
    if (opts.timeout && opts.time > 0) {
        setTimeout(() => audio.play(), opts.time);
    } else {
        audio.play();
    }
}
function stopAllSounds() {
    for (const key in SOUNDS) {
        SOUNDS[key].pause();
        SOUNDS[key].currentTime = 0;
    }
}
