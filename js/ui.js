function showGameOverScreen() {
  const overlay = document.getElementById('gameOverScreen');
  const sr      = document.getElementById('sr-status');

  overlay.removeAttribute('hidden');
  overlay.setAttribute('aria-hidden', 'false');

  // SR-Ansage auslösen
  if (sr) sr.textContent = 'Game Over';
}

function hideGameOverScreen() {
  const overlay = document.getElementById('gameOverScreen');
  const sr      = document.getElementById('sr-status');

  overlay.setAttribute('hidden', '');
  overlay.setAttribute('aria-hidden', 'true');

  if (sr) sr.textContent = '';
}
