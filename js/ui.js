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
  const root = document.documentElement;
  if (!document.fullscreenElement) {
    if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {});
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

function bindFullscreenButton() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFullscreen();
  });
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
    document.body.classList.add('is-portrait-lock');
    rotateNotice.hidden = false;
    rotateNotice.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    setInert(main, true);
    blurIfContainsActiveElement(main);
    rotateNotice?.focus({ preventScroll: true });
  } else {
    document.body.classList.remove('is-portrait-lock');
    rotateNotice.hidden = true;
    rotateNotice.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
    setInert(main, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupInstructionsDialog();
  bindFullscreenButton();
  updateOrientationLock();
});

window.addEventListener('resize', updateOrientationLock);
window.addEventListener('orientationchange', updateOrientationLock);

// global verfügbar machen
window.updateOrientationLock = updateOrientationLock;
