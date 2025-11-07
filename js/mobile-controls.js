/**
 * Mobile Touch-Steuerung für El Pollo Loco
 * - Steuert die Spielfigur über Buttons
 * - Verhindert Kontextmenü / Long-Press-Menü
 *
 * Erwartung:
 * Es existiert global ein 'keyboard' Objekt (wie im klassischen El Pollo Loco),
 * mit boolschen Properties: LEFT, RIGHT, UP, THROW.
 * Falls dein Keyboard andere Property-Namen hat, bitte anpassen.
 */

function bindMobileControls() {
  const btnLeft   = document.getElementById('btnLeft');
  const btnRight  = document.getElementById('btnRight');
  const btnJump   = document.getElementById('btnJump');
  const btnAction = document.getElementById('btnAction');

  if (!btnLeft || !btnRight || !btnJump || !btnAction) {
    return;
  }

  // Helper zum Binden von Touchstart/Touchend
  function press(btn, propName) {
    btn.addEventListener('touchstart', e => {
      e.preventDefault();
      if (window.keyboard) {
        window.keyboard[propName] = true;
      }
    }, { passive: false });

    btn.addEventListener('touchend', e => {
      e.preventDefault();
      if (window.keyboard) {
        window.keyboard[propName] = false;
      }
    }, { passive: false });

    // Auch Maus unterstützen (Tablet mit Mauspad, Convertible etc.)
    btn.addEventListener('mousedown', e => {
      e.preventDefault();
      if (window.keyboard) {
        window.keyboard[propName] = true;
      }
    });
    btn.addEventListener('mouseup', e => {
      e.preventDefault();
      if (window.keyboard) {
        window.keyboard[propName] = false;
      }
    });

    // Kontextmenü (Long Press) verhindern
    btn.addEventListener('contextmenu', e => e.preventDefault());
  }

  press(btnLeft,   'LEFT');
  press(btnRight,  'RIGHT');
  press(btnJump,   'UP');
  press(btnAction, 'THROW');
}

// beim Laden initialisieren
bindMobileControls();
