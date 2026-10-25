# Architektur

## Überblick

```
Browser ──► Cloudflare Worker (Astro)
              ├─ /  (One-Pager, prerendered, aus Static Assets)
              ├─ /impressum, /datenschutzerklaerung (prerendered)
              └─ /api/bewerbung  (on-demand, src/pages/api/bewerbung.ts)
                    ├─ Turnstile prüfen
                    ├─ Zod-Validierung
                    ├─ D1: applications-Tabelle (EU)
                    └─ E-Mail an Team + Bestätigung
```

Die Seite ist statisch vorgerendert: schnell, billig, perfekt für Crawler. Server-Code läuft nur beim Absenden der Bewerbung.

## Aufbau des One-Pagers

| # | Sektion | Anker | Inhalt | Hintergrund |
|---|---|---|---|---|
| 1 | Hero | `#start` | Wortmarke, Claim, Linie, Lead, „Mitglied werden!“ | dunkel + Wellen |
| 2 | Für dich | `#fuer-dich` | „Hier bist du richtig, wenn du …“ (4 Punkte) | dunkel |
| 3 | Über uns | `#ueber-uns` | Wer wir sind, Kernziele (3 Karten), Mission | dunkel |
| 4 | Was wir machen | `#was-wir-machen` | Wir bringen KI, Automatisierung und Optimierung in Unternehmen. Wie so ein Projekt abläuft (z. B. als Timeline) | dunkel |
| 5 | Partner | `#partner` | Logos der 5 Partner, je kurzer Satz zur Zusammenarbeit | hell (Logos sind dunkel) |
| 6 | Departments | `#departments` | Karten je Department: woran es eigenständig arbeitet. Klick → Vorauswahl im Wizard | dunkel |
| 7 | Statement | – | „Nicht KI nimmt Jobs …“ + Button | hell |
| 8 | Team | `#team` | Leitung hervorgehoben, restliches Team im Raster | dunkel |
| 9 | FAQ | `#faq` | Akkordeon mit `<details>` | dunkel oder hell |
| 10 | Mitmachen | `#mitmachen` | Bewerbungs-Wizard, Danke-Zustand inline | dunkel + Wellen |
| – | Footer | – | Kontakt, Social, Impressum, Datenschutz | dunkel |

Navigation im Header: Über uns · Was wir machen · Partner · Team · FAQ · Button „Mitglied werden!“ (→ `#mitmachen`).

### Was wir machen (Stand 25.10.2026)

Es gibt keine Weekly-Projekte mehr. Jedes Department arbeitet eigenständig an seinen Themen. Der gemeinsame Fokus: **Automatisierungen, Prozessoptimierungen und KI in Unternehmen einführen**, zusammen mit unseren Partnern.

### Partner (Stand 25.10.2026)

Torino · Basenbox · WU Wien · Raiffeisen Software · Roiss-Weiss GmbH. Logos in `design/partners/`, Daten in `src/content/partners.json` (Name, Website, Logo, ein Satz zur Zusammenarbeit, Reihenfolge).

## Geplante Ordnerstruktur

```
website/
├─ CLAUDE.md
├─ docs/                     Plan, Architektur, Brand, SEO, Entscheidungen
├─ design/brand/             Original-Assets (Logo, innovAIte-Kreis, CSS-Tokens) – nicht verändern
├─ design/partners/          Original-Logos der Partner (Benennung siehe README dort)
├─ public/
│  ├─ robots.txt, llms.txt, og.png, site.webmanifest
│  ├─ favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png   (aus dem innovAIte-Kreis)
├─ migrations/               D1-SQL-Migrationen (0001_applications.sql …)
├─ src/
│  ├─ lib/application.ts     Validierung der Bewerbung (Zod), lib/turnstile.ts, lib/mail.ts
│  ├─ assets/                Logo (SVG hell/dunkel), Wellen (AVIF/WebP), Team-Fotos – über astro:assets optimiert
│  ├─ components/
│  │  ├─ sections/           Hero, FuerDich, UeberUns, WasWirMachen, Departments, Partner, Statement, Team, Faq, Mitmachen
│  │  ├─ wizard/             Wizard-Schritte (Island)
│  │  └─ ui/                 Button, Card, Timeline, Field, Header, Footer
│  ├─ content/               team.json, faq.json, departments.json, partners.json
│  ├─ i18n/de.ts             UI-Texte (Buttons, Labels, Fehlermeldungen); en.ts kommt später
│  ├─ content.config.ts
│  ├─ layouts/BaseLayout.astro   SEO-Head, JSON-LD
│  ├─ lib/seo.ts             JSON-LD-Builder, Meta-Defaults
│  ├─ pages/
│  │  ├─ index.astro         der One-Pager
│  │  ├─ impressum.astro
│  │  ├─ datenschutzerklaerung.astro
│  │  └─ 404.astro
│  └─ styles/tokens.css, global.css
├─ astro.config.mjs
├─ wrangler.jsonc
└─ package.json
```

## Cloudflare-Ressourcen

| Ressource | Name | Zweck |
|---|---|---|
| Worker | `innovaite-website` | Website + Bewerbungs-Endpoint |
| D1 | `innovaite-db` (Jurisdiction `eu`) | Bewerbungen |
| Turnstile | innovaite.at | Spam-Schutz Formular |
| Email Service | `send_email`-Binding, Absender `noreply@innovaite.at` | Team-Benachrichtigung + Bestätigung |
| Cron Trigger | täglich | Bewerbungen > 12 Monate löschen |
| Web Analytics | innovaite.at | cookielose Besucherstatistik |
| Variablen | `APPLICATION_RECIPIENTS` | Empfängerliste für Bewerbungen |
| Secrets | `TURNSTILE_SECRET` | via `wrangler secret put` |
| Domain | innovaite.at, www → 301 auf Apex | Custom Domain am Worker. **Achtung: MX zeigt auf Google Workspace**, siehe DECISIONS.md |

Lokal: Secrets in `.dev.vars` (gitignored).

## Datenschutz

- D1 in EU-Jurisdiction, keine Daten außerhalb der EU speichern, soweit möglich.
- Bewerbungen nach festgelegter Frist löschen (z. B. 12 Monate, siehe DECISIONS.md).
- Analytics nur cookielos (Cloudflare Web Analytics), keine Remarketing-Pixel mehr.
