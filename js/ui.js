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

  // Falls der Screen vorher via hideElement() 'inert' gesetzt wurde: wieder interaktiv machen
  if (typeof setInert === 'function') {
    setInert(overlay, false);
  } else {
    overlay.removeAttribute('inert');
  }

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
  }
}

function bindFullscreenButton() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;
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

    blurIfContainsActiveElement(main);
    rotateNotice?.focus({ preventScroll: true });
  } else {
    document.body.classList.remove('is-portrait-lock');
    rotateNotice.hidden = true;
    rotateNotice.setAttribute('aria-hidden', 'true');
    rotateNotice.style.display = 'none';

    main.setAttribute('aria-hidden', 'false');
    setInert(main, false);
    main.style.display = '';
  }
}

function setupLegalDialog() {
  const dlg = document.getElementById('legalDialog');
  if (!dlg) return;

  // Klick auf Backdrop schließt
  dlg.addEventListener('click', (ev) => {
    const rect = dlg.getBoundingClientRect();
    const inDialog = (
      ev.clientX >= rect.left && ev.clientX <= rect.right &&
      ev.clientY >= rect.top && ev.clientY <= rect.bottom
    );
    if (!inDialog) dlg.close();
  });
}

function initUIBindings() {
  setupInstructionsDialog();
  setupLegalDialog();
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
});

window.addEventListener('resize', updateOrientationLock);
window.addEventListener('orientationchange', updateOrientationLock);

// global verfügbar machen
window.updateOrientationLock = updateOrientationLock;
window.toggleFullscreen = toggleFullscreen;
