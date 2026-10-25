# Anleitung: Deine Version der innovAIte-Website

Jedes Mitglied baut lokal auf dem eigenen PC **eine eigene, komplette Version** der neuen innovAIte-Website. Am Ende schaut sich die Projektleitung alle Versionen an und übernimmt die beste bzw. die besten Teile aus mehreren Versionen in die echte Seite.

Du pushst nichts, deployst nichts und brauchst keinen Cloudflare-Zugang. Das GitHub-Repo ist nur der Startpunkt: klonen ja, pushen nein.

## Loslegen

1. **Node.js 24** installieren (mindestens 22.23.4, sonst startet Astro nicht): [nodejs.org](https://nodejs.org). Prüfen mit `node -v`.
2. Repo klonen und im Terminal in den Projektordner wechseln:
   ```bash
   git clone https://github.com/innovaiteAT/website.git innovaite-website
   cd innovaite-website
   npm install
   npm run db:migrate   # lokale Datenbank anlegen (einmalig)
   npm run dev          # http://localhost:4321
   ```
   Optional `.dev.vars.example` nach `.dev.vars` kopieren. Ohne die Datei nimmt die Seite lokal automatisch die Testschlüssel.
3. Claude Code in diesem Ordner starten. Claude liest `CLAUDE.md` automatisch und kennt damit alle Regeln, das Branding und den Plan.
4. Lies einmal `CLAUDE.md` (Abschnitt „Fest vs. Spielraum“) und `docs/BRAND.md`.
5. Trag deinen Namen in `VARIANTE.md` ein und leg los.

Committe deine Zwischenstände ruhig lokal (`git commit`). So kannst du jederzeit zurück, und die Projektleitung sieht später, wie deine Version entstanden ist. Nur `git push` bitte nie.

## Was schon da ist

Die Seite läuft bereits, schlicht und funktional. Alle Pflicht-Sektionen sind da und mit den echten Inhalten befüllt. Das Bewerbungsformular liegt auf `/mitmachen`, inklusive Datenbank und Lebenslauf-Upload. Das ist **deine Ausgangsbasis, kein Design-Vorbild**. Bau es um, wie du willst.

| Was | Wo |
|---|---|
| Sektionen | `src/components/sections/*.astro` |
| Texte | `src/i18n/de.ts` |
| Team, FAQ, Departments, Partner | `src/content/*.json` |
| Farben, Buttons, Karten | `src/styles/tokens.css`, `src/styles/global.css` |
| Fotos (vorerst überall Cosmo) | `src/assets/photos/`, einbinden mit `photoFor()` aus `src/lib/photos.ts` |
| Bewerbung (Server) | `src/pages/api/bewerbung.ts`, `src/lib/application.ts` |
| Eingegangene Test-Bewerbungen ansehen | `npm run db:list` |
| Hochgeladenen Test-Lebenslauf öffnen | `npx wrangler r2 object get innovaite-cv/<cv_key> --local --file cv.pdf` (`cv_key` steht in `db:list`) |

Platzhalter: Die Department-Texte („Beschreibung folgt.“) und die Sätze zu den Partnern kommen noch. Erfinde dafür keine eigenen Inhalte, nimm Platzhalter. So lassen sich die Versionen fair vergleichen.

Neue Frage im Formular? Einfach ein Feld mit `name="..."` einbauen. Alles, was nicht zum Pflicht-Rahmen gehört, speichert der Server automatisch in der Spalte `extra`.

## Was du frei entscheidest

Fast alles, was man sieht und erlebt:
- Layout, Animationen, Bildsprache und Aufbau jeder Sektion
- Reihenfolge der Sektionen, zusätzliche Sektionen
- Texte und Formulierungen (im innovAIte-Ton)
- Fragen, Reihenfolge und Bedienung im Bewerbungsformular, innerhalb des Pflicht-Rahmens in `docs/APPLICATION-FLOW.md`
- Wie du den Code innerhalb einer Sektion aufbaust

Trau dich. Unterschiedliche Ideen sind genau der Sinn der Sache.

## Was für alle gleich ist

Alles unter „Fest“ in `CLAUDE.md`: One-Pager, Technik, Branding, Datenschutz, SEO-Grundregeln. Außerdem die **Dateistruktur** (eine Datei pro Sektion in `src/components/sections/`, gleiche Namen). Dadurch lassen sich später einzelne Sektionen aus verschiedenen Versionen kombinieren, z. B. dein Hero mit dem Bewerbungsformular von jemand anderem.

## Lokal testen ohne Cloudflare-Zugang

- Datenbank: läuft lokal (`npx wrangler d1 migrations apply innovaite-db --local`).
- Spam-Schutz: Turnstile-Testschlüssel aus `.dev.vars.example` nehmen, die lassen immer durch.
- E-Mails: werden lokal nicht verschickt, sondern im Terminal ausgegeben.

## Abgabe

1. `VARIANTE.md` ausfüllen: deine wichtigsten Entscheidungen und warum.
2. Screenshots (Desktop und Handy) in `variante/screenshots/` legen.
3. Projektordner zippen (inklusive `.git`, damit deine Commits mitkommen), **ohne** `node_modules`, `dist`, `.astro`, `.wrangler` und `.dev.vars`.
4. Zip an die Projektleitung schicken: Raphael Zährer (raphael.zaehrer@innovaite.at).

## Claude Code

- `/neue-sektion <anker> <thema>` legt eine Sektion nach unseren Regeln an.
- `/seo-check` prüft SEO und AEO.
- „Lass den brand-reviewer drüberschauen“ prüft gegen Corporate Design und Ton.
- Sag Claude ruhig: „Trag das in VARIANTE.md ein“, wenn du etwas entschieden hast.
- Eigene Einstellungen: `.claude/settings.local.json`, eigene Notizen an Claude: `CLAUDE.local.md`.
