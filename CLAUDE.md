# innovAIte Website

Relaunch von innovaite.at als **One-Pager** auf **Cloudflare Workers** (eigenes Hosting statt bisherigem Anbieter).
Ziele: Branding 1:1 erhalten, Optik modernisieren, geführter Bewerbungsprozess, starke SEO und AEO.

Inhaltlicher Fokus des Vereins: Die Departments arbeiten eigenständig. Gemeinsam bringen wir **Automatisierungen, Optimierungen und KI in Unternehmen**, mit unseren Partnern (Torino, Basenbox, WU Wien, Raiffeisen Software, Roiss-Weiss GmbH). Weekly-Projekte gibt es nicht mehr, nicht mehr erwähnen.

Mehrere Vereinsmitglieder bauen **jeweils lokal eine eigene, komplette Version** der Seite, jede:r mit eigenem Claude Code. Niemand pusht oder deployt. Die Projektleitung (Raphael) vergleicht die Versionen und übernimmt die besten Teile in die echte Seite.
Ablauf: @ANLEITUNG.md · Plan: @docs/PLAN.md · Architektur: @docs/ARCHITECTURE.md

## Fest vs. Spielraum

Diese Unterscheidung ist das Wichtigste in dieser Datei.

**Fest (für alle verbindlich, nur nach Absprache mit der Projektleitung ändern):**
- One-Pager-Prinzip (siehe unten)
- **Hero-Text, wortwörtlich und unverändert** (steht in `src/i18n/de.ts` unter `hero`). Nicht umformulieren, kürzen, ergänzen oder Satzzeichen ändern, auch nicht für SEO. Gestaltung des Heros ist Spielraum, der Text nicht:
  - Titel: innovAIte
  - Claim: Dein Weg zu Wissen und Wachstum
  - Text: Als gemeinnützige Organisation erforschen wir gemeinsam die KI‒Welt, lernen ihre verantwortungsvolle Nutzung und gestalten die digitale Zukunft
- Stack: Astro, Cloudflare Workers, D1 (EU), Turnstile, Cloudflare Email Service
- Brand-Regeln (siehe unten) und `design/brand/`
- Datenschutz-Rahmen: nur nötige Daten, 12 Monate Löschfrist, keine Tracker ohne Einwilligung
- SEO/AEO-Grundregeln, Barrierefreiheit, Definition of Done
- Alle Einträge unter „Fest“ in `docs/DECISIONS.md`

- Dateistruktur: eine Datei pro Sektion in `src/components/sections/` mit den Namen aus `docs/ARCHITECTURE.md`, Inhalte in Content Collections. So lassen sich Sektionen aus verschiedenen Versionen später kombinieren.
- Pflicht-Sektionen: Hero, Über uns, Was wir machen, Departments, Partner, Team, FAQ, Mitmachen, Footer

**Spielraum (wer die Version baut, entscheidet selbst):**
- Gestaltung jeder Sektion: Layout, Animation, Bildsprache, Komponentenaufbau
- Reihenfolge der Sektionen und zusätzliche Sektionen
- Texte und Formulierungen, solange sie dem Ton entsprechen
- Fragen, Reihenfolge und UX im Bewerbungs-Wizard, innerhalb des Rahmens in `docs/APPLICATION-FLOW.md`
- Interne Code-Struktur einer Sektion oder Komponente
- Zusätzliche Bibliotheken, wenn sie das Bundle nicht spürbar vergrößern

**Für Claude:** Wenn die Person eine Entscheidung im Spielraum trifft, setz sie um und blockiere nicht. Du darfst Alternativen vorschlagen, aber die Person entscheidet. Bei Konflikten mit „Fest“ weise kurz darauf hin und nenne die Regel. Wesentliche Entscheidungen (Sektionsaufbau, Wizard-Fragen, neue Bibliotheken) trägst du in `VARIANTE.md` ein. Diese Datei ist die Grundlage, auf der die Projektleitung die Versionen vergleicht.

## One-Pager-Prinzip (fest)

- Alle Inhalte stehen auf **einer Seite** (`/`), gegliedert in Sektionen mit Anker-IDs (`#team`, `#faq`, `#mitmachen` …).
- Navigation = Sprunglinks zu Sektionen, sanftes Scrollen, aktive Sektion im Header markiert.
- Der Bewerbungs-Wizard ist eine Sektion (`#mitmachen`), keine eigene Seite. Danke-Zustand erscheint direkt in der Sektion.
- Einzige Zusatzseiten: `/impressum`, `/datenschutzerklaerung` (rechtlich nötig) und `404`. Keine weiteren Unterseiten anlegen.
- Sektionsreihenfolge und Anker: siehe `docs/ARCHITECTURE.md`.

## Stack

- **Astro** (statisch vorgerendert) mit `@astrojs/cloudflare`
- **Cloudflare Workers** + Static Assets
- **D1** (Jurisdiction `eu`) für Bewerbungen, **Turnstile** gegen Spam
- **API-Endpoint** `src/pages/api/bewerbung.ts` für das Absenden des Bewerbungsformulars (funktioniert mit und ohne JavaScript), **Cloudflare Email Service** für Mails
- Styling: eigenes CSS mit den Tokens aus `design/brand/innovaite.css`, kein UI-Framework
- TypeScript strict, Inhalte als Astro Content Collections (`src/content/`)

## Befehle

Voraussetzung: Node.js ≥ 22.23.4 (empfohlen 24, siehe `.nvmrc`). Astro 7 startet mit älteren Versionen nicht.

```bash
npm run dev          # Astro Dev-Server, http://localhost:4321
npm run build        # Produktionsbuild
npm run preview      # Build lokal in workerd testen
npm run check        # astro check + Typen
npm run db:migrate   # Migrationen auf die lokale D1 anwenden
npm run db:list      # Lokal gespeicherte Bewerbungen anzeigen
npm run types        # Nach Änderungen an wrangler.jsonc: worker-configuration.d.ts neu erzeugen
```

Lokal braucht es keinen Cloudflare-Zugang: D1 läuft mit `--local`, Turnstile mit den Testschlüsseln aus `.dev.vars.example`, E-Mails werden in der Entwicklung nur geloggt. Deploy (`wrangler deploy`), alles mit `--remote` und `git push` nur nach Rückfrage. Das macht ausschließlich die Projektleitung.

## Brand-Regeln (fest)

Quelle der Wahrheit: `docs/BRAND.md` und `design/brand/`. Kurzfassung:

- Schreibweise immer **innovAIte**. Wortmarke: „AI“ in `#F43721`. **Ausnahme (fest):** Im Hero-Titel ist „AI“ weiß (`--ia-text`), nicht rot.
- Offizielles Logo: `design/brand/innovaite_logo.png`. Icons und Favicons: `design/brand/innovaite_logo_sticker.png` (innovAIte-Kreis). Logo nie nachzeichnen ohne Abgleich mit dem PNG, nie verzerren oder umfärben.
- Dunkler Grund `#010308`, helle Abschnitte `#F8F8F8`. Nie reines Weiß als Seitenhintergrund.
- Montserrat (300 bis 800). Rot `#7D1717` = Handlung (Pill-Button), Blau `#0181E7` = Information.
- Höchstens ein roter Button pro Viewport. CTA heißt „Mitglied werden!“ und springt zu `#mitmachen`.
- Keine neuen Akzentfarben, keine Emojis als Deko, keine Verläufe außer Wellen und Button.
- Ton: Du-Ansprache, Deutsch, kurze Sätze, auf Augenhöhe. Claim: „Dein Weg zu Wissen und Wachstum“
- Optik darf moderner werden (Layout, Motion, Details). Farben, Logo, Schrift und Ton bleiben.

## SEO und AEO (fest)

Details und Checkliste: `docs/SEO-AEO.md`. Weil alles auf einer URL liegt, zählt jede Sektion:

- Ein `<h1>` (im Hero), jede Sektion ist ein `<section id>` mit eigenem `<h2>`
- Jede Sektion beantwortet ihre Kernfrage im ersten Absatz (für KI-Antwortmaschinen)
- JSON-LD gesammelt im Head: Organization/NGO, WebSite, FAQPage, Personen aus `src/lib/seo.ts`
- Alles im HTML vorgerendert und ohne JavaScript lesbar. Akkordeons per `<details>`, nicht per JS versteckt.
- Neue Sektion → `llms.txt` und Navigation prüfen

## Konventionen

- Sektionen als eigene Komponenten in `src/components/sections/`, zusammengesetzt in `src/pages/index.astro`. Eine Sektion soll möglichst für sich funktionieren (eigene Styles im Component, nur Tokens und `ui/`-Bausteine von außen), damit sie in eine andere Version übertragbar ist.
- Anker-IDs deutsch, klein, mit Bindestrich (`#ueber-uns`, `#mitmachen`). Einmal veröffentlichte Anker nicht mehr umbenennen.
- Inhalte (Team, FAQ, Departments, Partner) gehören in Content Collections, UI-Texte in `src/i18n/de.ts`. Keine sichtbaren Strings direkt in Komponenten (Englisch kommt später).
- Fotos (Team, später Events) immer über `photoFor()` aus `src/lib/photos.ts` mit `<Image>` aus `astro:assets` einbinden. Vorerst zeigt jedes Foto den Platzhalter `src/assets/photos/cosmo_standing.jpeg` (`photosPlaceholderOnly` in `src/config.ts`). Keine Stockfotos, keine KI-generierten Personenfotos.
- Client-JS nur als Astro Island, wo es wirklich gebraucht wird (Bewerbungs-Wizard, aktive Navigation).
- Performance trotz langer Seite: Bilder lazy laden (außer Hero), keine großen Bundles.
- Barrierefreiheit: WCAG AA, sichtbarer Fokus, Skip-Link, `prefers-reduced-motion`, Buttons mind. 44 px.
- Secrets nur in `.dev.vars` bzw. `wrangler secret`, nie im Repo.

**DNS-Warnung:** `@innovaite.at`-Mails laufen über Google Workspace. Bei jeder DNS-Änderung MX- und TXT-Einträge erhalten.

## Definition of Done (fest)

1. `npm run build` und `npm run check` laufen fehlerfrei.
2. Seite im Browser angesehen (Desktop und 375 px mobil), alle Anker-Links getestet.
3. `brand-reviewer` und `/seo-check` ohne offene Punkte.
4. Lighthouse: Performance, SEO, Accessibility, Best Practices jeweils ≥ 95.
5. `VARIANTE.md` ist aktuell, Screenshots liegen in `variante/screenshots/`.
