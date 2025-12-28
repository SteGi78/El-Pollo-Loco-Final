function showGameOverScreen(win = false) {
  const overlay   = document.getElementById('gameOverScreen');
  const sr        = document.getElementById('sr-status');
  const messageEl = document.getElementById('gameOverMessage');

  if (!overlay) return;

  if (messageEl) {
    messageEl.textContent = win
      ? 'Du hast den Endboss besiegt!'
      : 'Du wurdest besiegt.';
  }

  overlay.style.display = 'grid';
  overlay.removeAttribute('hidden');
  overlay.setAttribute('aria-hidden', 'false');

  if (sr) sr.textContent = win ? 'Game gewonnen' : 'Game verloren';
}

function hideGameOverScreen() {
  const overlay = document.getElementById('gameOverScreen');
  const sr      = document.getElementById('sr-status');

  if (!overlay) return;

  overlay.style.display = 'none';
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('aria-hidden', 'true');

  if (sr) sr.textContent = '';
}

function setupInstructionsDialog() {
  const dialog = document.getElementById('instructionsDialog');
  if (!dialog) return;

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      dialog.close();
    }
  });
}

function toggleFullscreen() {
<<<<<<< HEAD
  // Fullscreen-HOST:
  // Wir schicken den Container (main/#app) in Fullscreen – NICHT .epl-wrap.
  // Grund: Wenn .epl-wrap selbst fullscreen ist, erzwingt der Browser oft 100vw/100vh
  // und das 3:2-Layout wird gedehnt. Als Host kann .epl-wrap innen „letterboxed“ bleiben.
  const target = document.querySelector('main')
    || document.getElementById('app')
    || document.documentElement;

  if (!document.fullscreenElement) {
    if (target?.requestFullscreen) {
      return target.requestFullscreen();
    }
  } else if (document.exitFullscreen) {
    return document.exitFullscreen();
=======
  const root = document.documentElement;
  if (!document.fullscreenElement) {
    if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {});
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
  }
}

function bindFullscreenButton() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;
<<<<<<< HEAD
  // nicht doppelt binden (Template-Reload / mehrfaches Init)
  if (btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  btn.addEventListener('click', (event) => {
    // wichtig: verhindert, dass der global data-action Handler hier noch einmal reinläuft
    // (wir rufen Fullscreen direkt im Klick-Event auf)
    event.stopPropagation();

    Promise.resolve(toggleFullscreen())
      .catch((e) => console.warn('Fullscreen failed:', e))
      .finally(updateFullscreenButtonState);
  });
}

function updateFullscreenButtonState() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;

  const isFs = !!document.fullscreenElement;
  btn.textContent = isFs ? 'Vollbild beenden' : 'Vollbild';
  btn.setAttribute('aria-pressed', String(isFs));
}

=======
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFullscreen();
  });
}

>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
function updateOrientationLock() {
  const rotateNotice = document.getElementById('rotateNotice');
  const main = document.querySelector('main');
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  const isSmallViewport = window.innerWidth <= 960;

  if (!rotateNotice || !main) return;

  if (portrait && isSmallViewport) {
    if (rotateNotice && !rotateNotice.hasAttribute('tabindex')) {
      rotateNotice.setAttribute('tabindex', '-1');
    }
<<<<<<< HEAD
    // Robust: nicht nur über CSS-Klassen steuern.
    // In manchen Mobile-/DevTools-Setups kann es zu Klassennamen-/Cascade-Hairlines kommen.
    // Deshalb setzen wir zusätzlich Inline-Styles, damit der Hinweis garantiert sichtbar ist.
    document.body.classList.add('is-portrait-lock');
    rotateNotice.hidden = false;
    rotateNotice.setAttribute('aria-hidden', 'false');
    rotateNotice.style.display = 'flex';

    main.setAttribute('aria-hidden', 'true');
    setInert(main, true);
    main.style.display = 'none';

=======
    document.body.classList.add('is-portrait-lock');
    rotateNotice.hidden = false;
    rotateNotice.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    setInert(main, true);
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
    blurIfContainsActiveElement(main);
    rotateNotice?.focus({ preventScroll: true });
  } else {
    document.body.classList.remove('is-portrait-lock');
    rotateNotice.hidden = true;
    rotateNotice.setAttribute('aria-hidden', 'true');
<<<<<<< HEAD
    rotateNotice.style.display = 'none';

    main.setAttribute('aria-hidden', 'false');
    setInert(main, false);
    main.style.display = '';
  }
}

function initUIBindings() {
  setupInstructionsDialog();
  bindFullscreenButton();
  updateFullscreenButtonState();
  updateOrientationLock();
}

document.addEventListener('DOMContentLoaded', initUIBindings);
window.addEventListener('epl:templates-loaded', initUIBindings);
document.addEventListener('fullscreenchange', () => {
  // Button-Label + Layout-Updates nach Fullscreen Toggle
  updateFullscreenButtonState();
  updateOrientationLock();

  // CSS kann zusätzlich über Klasse reagieren (für Browser-Eigenheiten)
  document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);

  // DPI/Canvas und Layout sauber nachziehen
  window.dispatchEvent(new Event('resize'));
=======
    main.setAttribute('aria-hidden', 'false');
    setInert(main, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupInstructionsDialog();
  bindFullscreenButton();
  updateOrientationLock();
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
});

window.addEventListener('resize', updateOrientationLock);
window.addEventListener('orientationchange', updateOrientationLock);

// global verfügbar machen
window.updateOrientationLock = updateOrientationLock;
<<<<<<< HEAD
window.toggleFullscreen = toggleFullscreen;
=======
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
