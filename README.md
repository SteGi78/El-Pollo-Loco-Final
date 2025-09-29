# El Pollo Loco – Submission-Ready Repo

Dieses Repository enthält die finale Version deines **El Pollo Loco**-Projekts – aufbereitet für GitHub, lokale Tests und GitHub Pages.

## Struktur
- Quellcode: Originalordner & Dateien unverändert übernommen
- Ergänzt:
  - `.gitignore` (für OS/Javascript/Build-Artefakte)
  - `README.md` (dieses Dokument)
  - `LICENSE` (MIT, optional anpassbar)

## Lokaler Start
1. **Variante A (einfach):** Öffne die `index.html` direkt im Browser (Doppelklick).  
   *Hinweis:* Manche Browser blockieren `file://`-Zugriffe auf Ressourcen. Nutze dann Variante B.

2. **Variante B (lokaler Webserver):**
   - Python (ab 3.x):  
     ```bash
     python -m http.server 5500
     ```
     Dann im Browser öffnen: <http://localhost:5500/index.html>
   - VS Code + Live Server: Rechtsklick auf `index.html` → **Open with Live Server**.

## Deployment auf GitHub Pages
1. Neues Repository auf GitHub erstellen (z. B. `ElPolloLoco`).
2. Inhalte dieses Ordners pushen:
   ```bash
   git init
   git add .
   git commit -m "feat: initial El Pollo Loco final"
   git branch -M main
   git remote add origin https://github.com/<USER>/<REPO>.git
   git push -u origin main
   ```
3. In den Repository-Einstellungen → **Pages** → **Branch: `main` / `/ (root)`** → **Save**.
4. Deine Seite ist kurz danach erreichbar unter:  
   `https://<USER>.github.io/<REPO>/index.html`

## Hinweise
- Einstiegspunkt: `index.html`
- Assets: img, js

## Lizenz
Dieses Repo enthält eine MIT-Lizenz als Platzhalter. Wenn du eine andere Lizenz wünschst, ändere die Datei `LICENSE` oder entferne sie.

---
*Stand: 2025-08-21*
