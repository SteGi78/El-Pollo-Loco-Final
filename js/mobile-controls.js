/**
<<<<<<< HEAD
 * Mobile-/Touch-Steuerung (Buttons)
 *
 * Problem bisher: Buttons werden per Template nachgeladen (fetch) ->
 * bindMobileControls() lief zu früh und hat keine Listener gesetzt.
 *
 * Fix:
 * - Bindings erst nach Event 'epl:templates-loaded'
 * - Pointer Events (decken Touch + Maus ab)
 * - Schutz gegen Mehrfach-Bindings
 */

(function () {
  function bindMobileControls() {
    if (window.__eplMobileControlsBound) return;

    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnAction = document.getElementById('btnAction');

    if (!btnLeft || !btnRight || !btnJump || !btnAction) return;

    // Helper: setzt Keyboard-Flags sicher
    function setKey(propName, value) {
      if (window.keyboard && Object.prototype.hasOwnProperty.call(window.keyboard, propName)) {
        window.keyboard[propName] = value;
      } else if (window.keyboard) {
        // fallback: falls Keyboard-Klasse die Property nicht vorab definiert
        window.keyboard[propName] = value;
      }
    }

    function bindPress(button, propName) {
      // Pointer Events: Touch + Maus + Stift
      button.addEventListener(
        'pointerdown',
        (e) => {
          // verhindert Scroll/Zoom-Gesten beim Drücken
          e.preventDefault();
          button.setPointerCapture?.(e.pointerId);
          setKey(propName, true);
        },
        { passive: false }
      );

      const release = (e) => {
        e.preventDefault();
        setKey(propName, false);
      };

      button.addEventListener('pointerup', release, { passive: false });
      button.addEventListener('pointercancel', release, { passive: false });
      button.addEventListener('pointerleave', release, { passive: false });

      // iOS/Older: Touch-Fallback (falls Pointer Events deaktiviert/buggy)
      button.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault();
          setKey(propName, true);
        },
        { passive: false }
      );
      button.addEventListener(
        'touchend',
        (e) => {
          e.preventDefault();
          setKey(propName, false);
        },
        { passive: false }
      );

      // Long-Press Menü verhindern
      button.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    bindPress(btnLeft, 'LEFT');
    bindPress(btnRight, 'RIGHT');
    bindPress(btnJump, 'UP');
    bindPress(btnAction, 'D'); // D = throw (wie in vielen EPL-Versionen)

    window.__eplMobileControlsBound = true;
  }

  // 1) Falls Templates schon da sind (z. B. Cache/Sehr schnell): direkt versuchen
  if (document.readyState !== 'loading') {
    bindMobileControls();
  }

  // 2) Sicher: nach Template-Load
  window.addEventListener('epl:templates-loaded', bindMobileControls);

  // 3) Fallback: DOMContentLoaded (für den Fall, dass das Template-Event ausbleibt)
  document.addEventListener('DOMContentLoaded', () => {
    // kleines Delay, damit fetch-Insert fertig sein kann
    setTimeout(bindMobileControls, 0);
  });
})();
=======
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
  press(btnAction, 'D');
}

// beim Laden initialisieren
bindMobileControls();
>>>>>>> c8f4fc3242a73c5fc6378c8305766fb02549da37
