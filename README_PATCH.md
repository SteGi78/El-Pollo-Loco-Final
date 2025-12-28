# El Pollo Loco – Patch (Layout & DPI)

**Ziel:** gestochen scharfes Canvas, zentriert, ohne verwaschenen Seitenhintergrund. Keine Engine-Änderungen.

## Dateien
- `style/override.css` – Layout-/Scaling-Anpassungen (nicht destruktiv).
- `js/dpi.js` – DPI/Retina-Fix für den Canvas mit `id="canvas"`.

## Einbau (3 Schritte)
1. **Dateien kopieren**
   - `style/override.css` nach `style/` (oder ins Projektwurzel, dann Pfade anpassen)
   - `js/dpi.js` nach `js/`

2. **index.html anpassen**
   - Direkt nach `<body>` **einen Wrapper** um den Canvas setzen:
     ```html
     <div class="epl-wrap">
       <canvas id="canvas" width="720" height="480" tabindex="0" aria-label="Spielfläche"></canvas>
     </div>
     ```
   - Im `<head>` **NACH** der bestehenden CSS einfügen:
     ```html
     <link rel="stylesheet" href="style/override.css">
     ```
   - Vor dem schließenden `</body>` **NACH** den anderen Skripten laden:
     ```html
     <script src="js/dpi.js"></script>
     ```
   - **Duplikat entfernen:** In deinem HTML steht `#mobileControls` zweimal. Bitte **nur eine** Instanz behalten (die mit Buttons).

3. **Hintergrundbilder in bestehender CSS**
   - Entferne/kommentiere Seiten-weite `background-image`-Deklarationen auf `body` (falls vorhanden). Der Level-Hintergrund wird im Canvas gezeichnet.

## Start
- Browser-Cache leeren (Ctrl/Cmd+F5) und Seite neu laden.
- Teste verschiedene Fenstergrößen → Canvas bleibt 16:9, scharf und zentriert.