---
name: seo-check
description: Vollständiger SEO- und AEO-Check des innovAIte-One-Pagers (Build, gerendertes HTML, Sektionen, JSON-LD, robots, llms.txt). Nutzen bei "SEO-Check", "AEO prüfen" oder /seo-check.
---

# SEO/AEO-Check

1. `npm run build` ausführen. Bei Fehlern abbrechen und Fehler melden.
2. Agent `seo-aeo-reviewer` auf `dist/` ansetzen.
3. Zusätzlich prüfen:
   - Sitemap enthält genau `/`, `/mitmachen`, `/impressum`, `/datenschutzerklaerung`.
   - `dist/robots.txt` verlinkt die Sitemap und blockiert keine KI-Crawler.
   - `dist/llms.txt` nennt die Kernfakten und die aktuellen Anker.
   - Alle `href="#…"` in Navigation und Buttons zeigen auf existierende IDs, keine ID doppelt.
   - Fakten konsistent auf der ganzen Seite (kostenlos, 3 bis 5 Std./Woche, 1030 Wien, E-Mail).
4. Ergebnis als kurze Liste: erledigt / offen, mit Datei und Fix.
