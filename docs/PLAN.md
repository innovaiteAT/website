# Projektplan: innovAIte Relaunch

## Ziele

1. **Unabhängigkeit**: Website läuft auf eigenem Cloudflare-Account, Code im eigenen Git-Repo.
2. **One-Pager bleibt**: alles auf einer Seite, Navigation über Sprunglinks.
3. **Branding bleibt**: Farben, Logo, Montserrat, Ton und Claim unverändert. Optik wird moderner.
4. **Bewerbungsprozess**: kurzer, geführter Ablauf direkt in der Seite statt einem langen Formular.
5. **Sichtbarkeit**: Top-SEO (Google) und AEO (ChatGPT, Perplexity, Google AI Overviews, Claude).

## Phasen

### Phase 0: Planung (jetzt)
- [x] Claude-Code-Setup, Struktur, Plan
- [x] Inhalts-Inventar der alten Seite (`docs/CONTENT-INVENTORY.md`)
- [x] Offene Entscheidungen klären (`docs/DECISIONS.md`, D6 bis D13)
- [x] Department-Liste final festlegen
- [ ] Login beim bisherigen Anbieter und Google-Workspace-Admin klären
- [ ] Department-Texte und Antwortzeit festlegen

### Phase 1: Fundament
- [x] Git-Repo, Astro 7 mit Cloudflare-Adapter, TypeScript strict
- [x] `wrangler.jsonc` mit D1-Binding (lokal), Migration `0001_applications.sql`
- [ ] Echte D1-Datenbank (EU) und Turnstile-Site im Cloudflare-Account anlegen (Projektleitung)
- [x] Design-Tokens aus `design/brand/innovaite.css` nach `src/styles/` übernommen
- [x] Icons und Favicons aus dem innovAIte-Kreis, OG-Bild aus dem Logo
- [ ] Logo als SVG nachbauen (hell + dunkel)
- [x] `BaseLayout` mit SEO-Head und JSON-LD, Header mit Anker-Navigation, Footer
- [x] Sektions-Gerüst in `index.astro` (eine Datei pro Pflicht-Sektion, mit echten Inhalten)
- [x] Lokal lauffähig ohne Cloudflare-Zugang: Turnstile-Testschlüssel, Mails im Dev-Modus nur geloggt
- [ ] Mobile Navigation (derzeit nur Logo + Button unter 900 px)
- [ ] Starter-Paket als Zip an die Mitglieder (siehe `ANLEITUNG.md`), danach bauen alle ihre eigene Version
- [ ] Versionen vergleichen, beste Sektionen ins Hauptprojekt übernehmen, erster Deploy auf `*.workers.dev` als Staging

### Phase 2: Design-Überarbeitung
- [ ] Moodboard und 2 bis 3 Hero-Varianten (gleiches Branding, modernere Umsetzung)
- [ ] Komponenten: Button, Karte, Timeline, Akkordeon, Formularfelder, Team-Karte
- [ ] Übergänge zwischen Sektionen (dunkel/hell), Scroll-Animationen mit `prefers-reduced-motion`
- [ ] Wellen-Hintergrund neu erstellen (z. B. dezente Animation, optimiertes AVIF/WebP). Bis dahin CSS-Ersatz.
- [ ] Symbol als Vektor (Strich-Version) neu erstellen, daraus `favicon.svg`
- [ ] Sticky Header mit aktiver Sektion, mobile Navigation

### Phase 3: Inhalte und Sektionen
- [ ] Alle Sektionen laut `docs/ARCHITECTURE.md` befüllen
- [ ] Impressum und Datenschutz (Datenschutz für neues Formular aktualisieren)
- [ ] Inhalte in Content Collections, Texte im innovAIte-Ton überarbeiten

### Phase 4: Bewerbungsprozess
- [ ] Mehrstufiger Wizard in `#mitmachen` (`docs/APPLICATION-FLOW.md`)
- [x] Endpoint + Validierung (Zod) + Turnstile + D1 (Grundgerüst steht)
- [ ] Benachrichtigung ans Team und Bestätigungs-Mail an Bewerber:innen
- [ ] Einfache Übersicht für das Team (Export CSV oder geschützte Admin-Ansicht)

### Phase 5: SEO und AEO
- [ ] JSON-LD, Sitemap, robots.txt, `llms.txt`
- [ ] Cloudflare-Einstellung „AI-Bots blockieren“ bewusst AUS (sonst kein AEO)
- [ ] OG-Bild, Google Search Console und Bing Webmaster Tools
- [ ] FAQ ausbauen: echte Fragen, die Studierende stellen

### Phase 6: Go-Live
- [ ] DNS auf Cloudflare umziehen, MX/TXT für Google Workspace übernehmen, SPF/DKIM/DMARC ergänzen (Ablauf in DECISIONS.md)
- [ ] Lighthouse ≥ 95, Formular Ende-zu-Ende getestet
- [ ] Alten Anbieter erst kündigen, wenn neue Seite stabil läuft (mind. 2 Wochen parallel)

## Nicht-Ziele (vorerst)

- Keine Unterseiten außer Impressum, Datenschutz und 404.
- Kein CMS. Inhalte pflegen wir als Markdown/JSON im Repo.
- Keine Mehrsprachigkeit (Englisch eventuell später).
- Kein Login für Mitglieder.
