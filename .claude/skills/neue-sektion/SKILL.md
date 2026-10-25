---
name: neue-sektion
description: Legt eine neue Sektion im innovAIte-One-Pager an, mit Anker, H2, Antwort-zuerst-Text, Brand-Komponenten, Navigation und llms.txt. Nutzen bei "neue Sektion", "Abschnitt hinzufügen" oder /neue-sektion <anker> <thema>.
---

# Neue Sektion anlegen

Argumente: `$ARGUMENTS` (z. B. `referenzen "Projekte mit Unternehmen"`).

Die Website ist ein One-Pager. Lege **keine** neue Seite unter `src/pages/` an.

1. Kernfrage der Sektion in einem Satz festhalten („Welche Projekte haben wir mit Unternehmen umgesetzt?“).
2. Mit der Person klären, wo die Sektion im One-Pager sitzt. Pflicht-Sektionen aus `CLAUDE.md` gibt es mit diesen Dateinamen; neue Sektionen bekommen einen eigenen, sprechenden Namen. Sektion und Position in `VARIANTE.md` eintragen. `docs/ARCHITECTURE.md` nicht ändern, das ist die gemeinsame Vorlage.
3. Komponente in `src/components/sections/` anlegen: `<section id="<anker>" aria-labelledby="<anker>-title">` mit genau einem `<h2 id="<anker>-title">`.
4. Erster Absatz beantwortet die Kernfrage in 1 bis 2 Sätzen. Danach Details.
5. Wiederkehrende Inhalte aus Content Collections laden, nicht hartcodieren.
6. Nur Komponenten und Tokens aus dem Brand-System. Höchstens ein roter Button pro Viewport. Hell/dunkel-Wechsel mit den Nachbarsektionen abstimmen.
7. In `src/pages/index.astro` einbinden. Falls wichtig: Link in die Header-Navigation und in `public/llms.txt`. Falls relevant: JSON-LD in `src/lib/seo.ts` ergänzen.
8. `npm run build` und `npm run check`, dann `brand-reviewer` und `seo-aeo-reviewer` laufen lassen und Befunde beheben.
