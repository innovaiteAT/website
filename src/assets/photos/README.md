# Fotos

Alle Fotos der Website liegen hier. Eingebunden werden sie über `photoFor()` aus `src/lib/photos.ts` und von Astro automatisch optimiert (WebP, passende Größen).

## Platzhalter

`cosmo_standing.jpeg` ist das Platzhalterfoto. Solange `photosPlaceholderOnly` in `src/config.ts` auf `true` steht, zeigt **jedes Foto** auf der Seite Cosmo, auch wenn schon echte Fotos hier liegen.

## Echte Fotos (später)

| Ordner | Dateiname | Beispiel |
|---|---|---|
| `team/` | ID aus `src/content/team.json` | `team/raphael-zaehrer.jpg` |

Fehlt ein Foto, springt automatisch der Platzhalter ein. Weitere Ordner (z. B. `events/`) funktionieren genauso: `photoFor('events', 'kickoff-2026')`.

- Format: JPG oder WebP, mind. 800 × 800 px, Gesicht mittig (wird quadratisch zugeschnitten)
- Nur Fotos, für die die Person der Veröffentlichung zugestimmt hat
