/**
 * Sound- und Mute-Handling für El Pollo Loco
 * - Global muten / entmuten
 * - UI-Button (🔈 / 🔇) aktualisieren
 * - Mute-Status in localStorage persistieren
 * - Alle bekannten Sounds zentral verwalten (SOUNDS.*)
 */

// Globale Mute-Flag
let isMuted = false;

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
 * Erstellt Audio-Objekte aus der Konfiguration.
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
 * Ermittelt ein Audio-Objekt aus String-Key oder direkter Übergabe.
 * @param {string|HTMLAudioElement} soundRef
 * @returns {HTMLAudioElement|null}
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
 * Wendet den aktuellen Mute-Status auf alle bekannten Sounds an.
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
 * Spielt einen Sound ab (falls nicht gemutet).
 * @param {string|HTMLAudioElement} soundRef
 * @param {boolean} force - Bei true wird trotz Mute abgespielt.
 * @param {number} delayMs - Optionaler Delay in ms.
 */
function playSound(soundRef, force = false, delayMs = 0) {
  const audio = resolveSound(soundRef);
  if (!audio) return;
  const allowed = force || !isMuted;
  if (!allowed) return;

  const play = () => {
    audio.currentTime = 0;
    audio.muted = isMuted && !force;
    const baseVolume = parseFloat(audio.dataset.baseVolume ?? 1);
    audio.volume = (isMuted && !force) ? 0 : baseVolume;
    audio.play().catch(() => {});
  };

  if (delayMs > 0) {
    setTimeout(play, delayMs);
  } else {
    play();
  }
}

/**
 * Pausiert alle Sounds (optional mit Reset der Zeit).
 * @param {boolean} resetTime
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
 * Aktualisiert das Icon und aria-label am Button.
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
 * Schaltet den globalen Sound an/aus.
 * Speichert außerdem den Zustand in localStorage.
 */
function toggleMute() {
  isMuted = !isMuted;
  applyMuteStateToAllSounds();
  updateMuteButtonUI();
  localStorage.setItem('muted', isMuted ? '1' : '0');
}

/**
 * Liest den gespeicherten Mute-Zustand aus localStorage und
 * synchronisiert UI + Audio.
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
