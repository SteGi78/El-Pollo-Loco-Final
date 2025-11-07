/**
 * Sound- und Mute-Handling für El Pollo Loco
 * - Global muten / entmuten
 * - UI-Button (🔈 / 🔇) aktualisieren
 * - Mute-Status in localStorage persistieren
 */

// Globale Mute-Flag
let isMuted = false;

// Alle Sounds des Spiels kommen hier rein
// Wichtig: füge hier nach Bedarf deine echten Audio-Objekte hinzu.
const ALL_SOUNDS = [];

// Beispielhafte Standard-Sounds (Passe Pfade/Namen an dein Projekt an!)
const SND_WALK   = new Audio('audio/walk.mp3');
const SND_JUMP   = new Audio('audio/jump.mp3');
const SND_COIN   = new Audio('audio/coin.mp3');
const SND_THROW  = new Audio('audio/bottle_throw.mp3');
const SND_HIT    = new Audio('audio/hit.mp3');
const SND_MUSIC  = new Audio('audio/game.mp3');

SND_MUSIC.loop = true;

// Liste befüllen
ALL_SOUNDS.push(
  SND_WALK,
  SND_JUMP,
  SND_COIN,
  SND_THROW,
  SND_HIT,
  SND_MUSIC
);

/**
 * Wendet den aktuellen Mute-Status auf alle bekannten Sounds an.
 */
function applyMuteStateToAllSounds() {
  ALL_SOUNDS.forEach(snd => {
    if (!snd) return;
    if (isMuted) {
      snd.volume = 0;
      // SND_MUSIC.pause(); // Optional: komplette Stille
    } else {
      snd.volume = 1;
      // Falls Hintergrundmusik laufen soll:
      // if (snd === SND_MUSIC && snd.paused) snd.play().catch(()=>{});
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

// beim Laden aufrufen
initMuteStateFromStorage();

// global verfügbar machen für onclick="toggleMute()"
window.toggleMute = toggleMute;
