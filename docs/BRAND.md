# innovAIte Brand (Referenz für die Website)

## Assets in `design/brand/`

Diese Dateien sind das Original und werden nicht verändert. Für die Website kopieren und optimieren wir sie nach `src/assets/` bzw. `public/`.

| Datei | Inhalt | Einsatz auf der Website |
|---|---|---|
| `innovaite_logo.png` | **Offizielles Logo**: Symbol in Cyan + Wortmarke weiß, „AI“ rot. 901×238, transparent | Header, Footer, Hero. Vorlage für eine SVG-Version (siehe unten) |
| `innovaite_logo_sticker.png` | **innovAIte-Kreis**: Symbol mit blauem Glow auf dunklem Grund. 1024×1024, 1,4 MB | Favicon, Apple-Touch-Icon, Web-Manifest-Icons, Social-Avatar, OG-Bild-Element |
| `innovaite.css` | Farb-Tokens + Basis-Komponenten | Grundlage für `src/styles/tokens.css` |

**Kommt später (Phase 2):** Symbol als Vektor (Strich-Version für Favicon und kleine Icons) und der Wellen-Hintergrund. Beides wird neu erstellt. Bis dahin nutzt die Website im Hero den CSS-Ersatz (radiale Verläufe in `#AC0000`/`#0181E7` auf `#010308`). Der Verweis auf `background-waves.png` in `innovaite.css` greift so lange ins Leere, das ist Absicht.

### Hinweise zur Verwendung

- Das Logo gibt es nur als PNG. Für scharfe Darstellung auf allen Bildschirmen bauen wir in Phase 1 eine **SVG-Version** (Symbol als Pfade, Wortmarke als Pfade, kein Live-Text), pixelgenau am PNG abgeglichen. Bis dahin nutzen wir das PNG mit `width`/`height`, als WebP/AVIF optimiert.
- Die Wortmarke im Logo ist hellgrau/weiß und funktioniert nur auf dunklem Grund. Für helle Abschnitte braucht es eine Variante mit Wortmarke in `#010101`, die entsteht aus der SVG-Version.
- Der Kreis ist zu groß fürs Web (1,4 MB). Daraus erzeugen wir: `favicon.ico` (32), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`. Im Favicon unter 32 px wirkt der Glow matschig, dort später die Vektor-Strichversion als `favicon.svg` nehmen.
- Das Logo im JSON-LD (`Organization.logo`) ist eine quadratische PNG-Datei aus dem Kreis, mind. 512×512.

## Was gleich bleibt

- Wortmarke **innovAIte**, „AI“ in `#F43721`, Netzwerk-Symbol in `#38BCFD`
- Tiefschwarzer Grund mit blau-roten Lichtwellen
- Montserrat, weiße Typografie, viel Luft
- Bordeauxroter Pill-Button „Mitglied werden!“ mit rotem Glow
- Ton: Du, kurz, aktiv, auf Augenhöhe. „Nicht kompliziert. Nicht elitär. Sondern relevant. Offen. Und gemeinsam.“

## Farben

| Token | Hex | Einsatz |
|---|---|---|
| `--ia-black` | `#010308` | Seitenhintergrund |
| `--ia-surface` | `#16181B` | Karten, Felder |
| `--ia-surface-2` | `#1E2024` | Hover, Zeilen |
| `--ia-border` | `#38383D` | Rahmen |
| `--ia-divider` | `#6B6B6E` | Trennlinie |
| `--ia-muted` | `#5D5E61` | nur Platzhalter |
| `--ia-text` | `#F8F8F8` | Text auf dunkel |
| `--ia-text-soft` | `#DADADA` | Fließtext auf dunkel |
| `--ia-light` | `#F8F8F8` | heller Abschnitt |
| `--ia-ink` | `#010101` | Überschriften auf hell |
| `--ia-ink-soft` | `#3D3F44` | Text auf hell |
| `--ia-red` | `#7D1717` | Buttons (Handlung) |
| `--ia-red-hover` | `#9A1F1F` | Hover |
| `--ia-red-bright` | `#F43721` | „AI“, kleine Highlights |
| `--ia-wave-red` | `#AC0000` | Wellen |
| `--ia-blue` | `#0181E7` | Links, Info |
| `--ia-cyan` | `#38BCFD` | Logo, Haken, Highlights |

## Typografie

Hero 500 bis 600, `clamp(3.4rem, 9vw, 7rem)` · Claim 300 · Abschnittstitel auf hell 700 bis 800 · Fließtext 400, 1 rem, Zeilenhöhe 1,6, max. 70 Zeichen · Button 700.

## Komponenten

Pill-Button, Karten (Radius 16 px, Rand statt Schatten, blauer Glow beim Hover), Felder (`#16181B`, 62 px hoch), vertikale Timeline (weiße Linie, kursive Titel), 1-px-Trennlinie unter dem Claim. Details in `design/brand/innovaite.css`.

## Spielraum beim Redesign

Erlaubt: neues Layout, Bento-Grids, Scroll-Animationen (mit `prefers-reduced-motion`), animierte oder interaktive Wellen, bessere Bilder vom Team, Mikro-Interaktionen.
Nicht erlaubt: neue Akzentfarben, andere Schrift, helles Gesamt-Theme, Logo verändern, mehrere rote Buttons pro Ansicht, Emojis als Deko.
