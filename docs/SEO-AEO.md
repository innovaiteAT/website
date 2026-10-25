# SEO und AEO

**SEO** = in Google/Bing gut ranken. **AEO** (Answer Engine Optimization) = von ChatGPT, Perplexity, Google AI Overviews, Claude & Co. als Quelle zitiert werden.

## One-Pager-Strategie

Wir haben im Kern eine URL. Das ist für einen Verein unserer Größe gut machbar, braucht aber Disziplin:

- Die Startseite rankt für alle Zielbegriffe. Deshalb muss jede Sektion inhaltlich stark sein, nicht nur Optik.
- Jede Sektion ist ein `<section id="…" aria-labelledby="…">` mit eigenem `<h2>`. Google kann einzelne Sektionen als Sprunglinks („Springe zu“) in den Suchergebnissen zeigen.
- Lieber vollständige Texte im HTML als Inhalte hinter Tabs oder JS. Akkordeons mit `<details>`, damit der Text im HTML steht.
- Die FAQ ist unser stärkster AEO-Hebel: viele echte Fragen mit kurzen, klaren Antworten.
- Brand-Suche („innovAIte“) und lokale Begriffe („KI Verein Wien“) sind realistisch. Breite Begriffe wie „KI lernen“ eher nicht.

## Zielbegriffe (Entwurf, zu schärfen)

- „KI Verein Wien“, „KI Studenteninitiative Wien“, „künstliche Intelligenz lernen Studierende Wien“
- „KI Community Wien kostenlos“, „ehrenamtlich KI Projekte Studierende“
- „KI Einführung Unternehmen Studierende“, „Automatisierung Unternehmen Wien Studenteninitiative“, „Prozessoptimierung KI Wien“
- Marke: „innovAIte“, „innovaite Wien“

## Technik (einmalig)

- [ ] Sitemap: nur `/`, `/impressum`, `/datenschutzerklaerung`. Robots.txt verlinkt sie.
- [ ] `robots.txt`: Suchmaschinen und KI-Crawler (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) erlauben
- [ ] **Cloudflare**: „Block AI bots“ und „AI Labyrinth“ deaktivieren, Managed robots.txt prüfen. Sonst sehen uns KI-Antwortmaschinen nicht.
- [ ] `llms.txt` im Root: kurze Beschreibung von innovAIte, Kernfakten, Links auf die Anker (`/#faq`, `/#team` …)
- [ ] Canonical `https://innovaite.at/`, `www` → Apex per 301, HTTPS only
- [ ] `lang="de-AT"`, Open Graph + Twitter Cards, ein starkes OG-Bild
- [ ] Core Web Vitals grün trotz langer Seite: Hero-Bild priorisiert, alles darunter lazy, Bilder AVIF/WebP mit Größenangaben, Fonts selbst gehostet mit `font-display: swap`
- [ ] Google Search Console + Bing Webmaster Tools (Bing speist ChatGPT-Suche)
- [ ] Alte URLs (z. B. `/faq`, `/ueber-uns`, falls vorhanden) per 301 auf `/#faq`, `/#ueber-uns`

## Strukturierte Daten (JSON-LD, alles auf `/`)

| Schema | Quelle |
|---|---|
| `Organization` (`NGO`) | Name, Logo, URL, E-Mail, Adresse 1030 Wien, `sameAs` (LinkedIn, Instagram), `foundingDate`, `nonprofitStatus` |
| `WebSite` | Name, URL |
| `FAQPage` | aus der FAQ-Collection |
| `Person` | Leitungsteam über `member`/`founder` an Organization |
| `knowsAbout` an Organization | KI-Einführung, Automatisierung, Prozessoptimierung |
| `Organization` je Partner | Name, URL, Logo. Partner im sichtbaren Text nennen, keine erfundenen Beziehungen (z. B. nicht `sponsor`, wenn es keiner ist) |
| `Event` | Events mit Datum, falls angezeigt |

Ein zusammenhängender `@graph` im Head, mit `@id`-Verweisen statt Dopplungen.

## Inhalte für AEO

- Jede Sektion beantwortet ihre Kernfrage im **ersten Absatz** in 1 bis 2 Sätzen („innovAIte ist eine gemeinnützige Studierenden-Initiative in Wien, die …“).
- Klare Fakten, die KIs zitieren können: kostenlos, 3 bis 5 Std./Woche, keine Vorkenntnisse, Wien 1030.
- Überschriften als echte Fragen formulieren, wo es passt.
- FAQ ausbauen (Ziel: 15 bis 25 Fragen), echte Fragen von Interessierten sammeln.
- Konsistente Angaben überall (Website, LinkedIn, Instagram, Google Business Profil).

## Checkliste für den One-Pager

- [ ] Title ≤ 60 Zeichen, enthält Kernbegriff + „innovAIte“
- [ ] Description 140 bis 160 Zeichen, mit Nutzen
- [ ] Genau ein H1 (Hero), jede Sektion ein H2, H3 darunter
- [ ] Jede Sektion hat `id`, ersten Absatz mit Antwort, sinnvolle Länge
- [ ] Alle Navigations-Anker funktionieren, keine doppelten IDs
- [ ] Bilder mit `alt`, `width`, `height`, unterhalb des Heros `loading="lazy"`
- [ ] JSON-LD validiert (Rich Results Test, Schema Validator)
- [ ] Impressum und Datenschutz mit eigenem Title, `noindex` nicht nötig, aber nicht in der Hauptnavigation
