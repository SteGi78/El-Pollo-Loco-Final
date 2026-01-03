/**
 * Datei: merge/js/sounds.js
 * Beschreibung: Teil des Browser-Spiels „El Pollo Loco“. Enthält Logik, Klassen und/oder Hilfsfunktionen.
 * Hinweis: Wird im Frontend (HTML/CSS/JavaScript) ausgeführt.
 * @author Stephan Gilles
 * @date 03.01.2026
 */

// Globale Mute-Flag
let isMuted = false;

// Merkt sich, ob die Hintergrundmusik (SOUNDS.game) nach dem Entmuten wieder anlaufen soll.
let resumeGameAfterUnmute = false;

// Konfiguration aller Spiel-Sounds
const SOUND_CONFIG = {
  walk:          { src: 'audio/walk.mp3',            volume: 0.35 },
  jump:          { src: 'audio/jump.mp3',            volume: 0.6 },
  coin:          { src: 'audio/coin.mp3',            volume: 0.45 },
  bottleThrow:   { src: 'audio/bottle_throw.mp3',    volume: 0.5 },
  bottleSplash:  { src: 'audio/bottle_shatter.mp3',  volume: 0.5 },
  bottleCollect: { src: 'audio/bottle_collect.mp3',  volume: 0.55 },
  hurt:          { src: 'audio/hurt.mp3',            volume: 0.65 },
  chickenHurt:   { src: 'audio/chicken_hurt.mp3',    volume: 0.55 },
  chickHurt:     { src: 'audio/small_chicken_hurt.mp3', volume: 0.55 },
  snakeHurt:     { src: 'audio/snake_hurt.mp3',      volume: 0.55 },
  bossDead:      { src: 'audio/boss_dead.mp3',       volume: 0.65 },
  bossIntro:     { src: 'audio/boss_intro_sound.mp3', volume: 0.7 },
  gameWon:       { src: 'audio/game_won.mp3',        volume: 0.6 },
  gameLost:      { src: 'audio/game_lost.mp3',       volume: 0.6 },
  yes:           { src: 'audio/yes.mp3',             volume: 0.5 },
  game:          { src: 'audio/game.mp3',            volume: 0.15, loop: true }
};

// Globale Sound-Sammlungen
const ALL_SOUNDS = [];
const SOUNDS = {};

/**
 * Funktion buildSounds.
 * @returns {void}
 */
function buildSounds() {
  Object.entries(SOUND_CONFIG).forEach(([key, cfg]) => {
    const audio = new Audio(cfg.src);
    audio.loop = !!cfg.loop;
    audio.preload = 'auto';
    audio.dataset.baseVolume = cfg.volume ?? 1;
    audio.volume = cfg.volume ?? 1;
    SOUNDS[key] = audio;
    ALL_SOUNDS.push(audio);
  });
}

buildSounds();

/**
 * Funktion resolveSound.
 * @param {unknown} soundRef - Parameter.
 * @returns {void}
 */
function resolveSound(soundRef) {
  if (!soundRef) return null;
  if (typeof soundRef === 'string') {
    return SOUNDS[soundRef] || null;
  }
  if (soundRef instanceof Audio) {
    return soundRef;
  }
  return null;
}

/**
 * Funktion applyMuteStateToAllSounds.
 * @returns {void}
 */
function applyMuteStateToAllSounds() {
  ALL_SOUNDS.forEach(snd => {
    if (!snd) return;
    const baseVolume = parseFloat(snd.dataset.baseVolume ?? 1);
    snd.volume = isMuted ? 0 : baseVolume;
    snd.muted = isMuted;
    if (isMuted) {
      snd.pause();
    }
  });
  window.soundMuted = isMuted;
}

/**
 * Funktion playSound.
 * @param {unknown} soundRef - Parameter.
 * @param {boolean} force - Parameter.
 * @param {number} delayMs - Parameter.
 * @returns {void}
 */
function playSound(soundRef, force = false, delayMs = 0) {
  const audio = resolveSound(soundRef);
  if (!audio) return;

  if (delayMs > 0) {
    setTimeout(playResolvedAudio, delayMs, audio, force);
    return;
  }
  playResolvedAudio(audio, force);
}

/**
 * Funktion playResolvedAudio.
 * @param {unknown} audio - Parameter.
 * @param {boolean} force - Parameter.
 * @returns {void}
 */
function playResolvedAudio(audio, force) {
  if (!force && isMuted) return muteAudio(audio);
  prepareAudioForPlayback(audio);
  audio.play().catch(() => {});
}

/**
 * Funktion prepareAudioForPlayback.
 * @param {unknown} audio - Parameter.
 * @returns {void}
 */
function prepareAudioForPlayback(audio) {
  audio.currentTime = 0;
  audio.muted = false;
  audio.volume = getBaseVolume(audio);
}

/**
 * Funktion muteAudio.
 * @param {unknown} audio - Parameter.
 * @returns {void}
 */
function muteAudio(audio) {
  audio.pause();
  audio.muted = true;
  audio.volume = 0;
}

/**
 * Funktion getBaseVolume.
 * @param {unknown} audio - Parameter.
 * @returns {unknown}
 */
function getBaseVolume(audio) {
  return parseFloat(audio.dataset.baseVolume ?? 1);
}

/**
 * Funktion pauseAllSounds.
 * @param {boolean} resetTime - Parameter.
 * @returns {void}
 */
function pauseAllSounds(resetTime = false) {
  ALL_SOUNDS.forEach(snd => {
    snd.pause();
    if (resetTime) {
      snd.currentTime = 0;
    }
  });
}

/**
 * Funktion updateMuteButtonUI.
 * @returns {void}
 */
function updateMuteButtonUI() {
  const btn = document.getElementById('muteBtn');
  if (!btn) return;
  btn.textContent = isMuted ? '🔇' : '🔈';
  btn.setAttribute(
    'aria-label',
    isMuted
      ? 'Sound ist aus. Klicken, um Sound wieder einzuschalten.'
      : 'Sound ist an. Klicken, um den Sound auszuschalten.'
  );
}

/**
 * Funktion toggleMute.
 * @returns {void}
 */
function toggleMute() {
  rememberGameMusicStateBeforeMute();
  isMuted = !isMuted;
  applyMuteStateToAllSounds();
  updateMuteButtonUI();
  saveMuteStateToStorage();
  resumeGameMusicAfterUnmute();
}

/**
 * Funktion rememberGameMusicStateBeforeMute.
 * @returns {void}
 */
function rememberGameMusicStateBeforeMute() {
  if (isMuted) return;
  const game = SOUNDS.game;
  resumeGameAfterUnmute = !!(game && !game.paused);
}

/**
 * Funktion saveMuteStateToStorage.
 * @returns {void}
 */
function saveMuteStateToStorage() {
  localStorage.setItem('muted', isMuted ? '1' : '0');
}

/**
 * Funktion resumeGameMusicAfterUnmute.
 * @returns {void}
 */
function resumeGameMusicAfterUnmute() {
  if (isMuted) return;

  const game = SOUNDS.game;
  const shouldResume = resumeGameAfterUnmute || !!window._gameMusicShouldPlay;
  if (game && shouldResume) playResolvedAudio(game, true);
  resumeGameAfterUnmute = false;
}

/**
 * Funktion initMuteStateFromStorage.
 * @returns {void}
 */
function initMuteStateFromStorage() {
  const saved = localStorage.getItem('muted');
  if (saved === '1') {
    isMuted = true;
  }
  applyMuteStateToAllSounds();
  updateMuteButtonUI();
}

document.addEventListener('DOMContentLoaded', () => {
  initMuteStateFromStorage();
});

// global verfügbar machen
window.toggleMute = toggleMute;
window.playSound = playSound;
window.pauseAllSounds = pauseAllSounds;
window.SOUNDS = SOUNDS;
