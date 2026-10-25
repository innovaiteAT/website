# Bewerbungsprozess „Mitglied werden!“

Die Bewerbung liegt auf der eigenen Seite `/mitmachen` (D18). Jeder „Mitglied werden!“-Button führt dorthin.

Dieses Dokument hat zwei Teile: einen **Pflicht-Rahmen**, der für alle gilt, und einen **Vorschlag**, den die verantwortliche Person frei anpassen, umbauen oder verwerfen kann.

## Pflicht-Rahmen (fest)

**Diese Angaben müssen erhoben werden:**

| Feld | Warum |
|---|---|
| Name | Wir müssen wissen, wer sich bewirbt |
| E-Mail | Kontakt und Bestätigungsmail |
| Telefonnummer | Schneller Kontakt |
| Lebenslauf (PDF, max. 5 MB) | Einschätzung der Bewerbung. Liegt in R2 (EU), in D1 nur der Schlüssel `cv_key` |
| Interessante Departments (Mehrfachauswahl, inkl. „Weiß ich noch nicht“) | Auswertung Bedarf je Department |
| Wo hast du von uns gehört? | Auswertung Marketing-Kanäle |
| Datenschutz-Einwilligung (Checkbox, nicht vorausgewählt, Link auf `/datenschutzerklaerung`) | DSGVO |

**Technisch verbindlich:**
- Läuft auf `/mitmachen`. Danke-Zustand inline auf der Seite.
- Lebenslauf: nur PDF (Dateiinhalt wird geprüft), max. 5 MB, Prüfung im Browser und auf dem Server.
- Ohne JavaScript nutzbar (Fallback: normales Formular in derselben Sektion).
- Serverseitige Validierung mit Zod im Endpoint (`src/lib/application.ts`), nicht nur im Browser.
- Turnstile vor dem Absenden. Gespeichert wird in D1, Mails über Cloudflare Email Service.
- Nur Daten erheben, die wir wirklich auswerten. Keine sensiblen Daten (Alter nur wenn nötig, keine Gesundheit, Religion etc.).
- Jede neue Frage → Spalte in der D1-Migration und Absatz in der Datenschutzerklärung.
- Barrierefrei: Labels an jedem Feld, Fehlermeldungen per `aria-describedby`, Fokus auf die neue Frage beim Schrittwechsel.
- Department-Liste kommt aus der Content Collection `departments`, nicht hartcodiert.

## Spielraum (entscheidet die verantwortliche Person)

- Welche **zusätzlichen Fragen** (Motivation, Studium, Erfahrung, Verfügbarkeit, LinkedIn, …)
- **Reihenfolge**, Anzahl der Schritte, eine oder mehrere Fragen pro Schritt
- Feldtypen (Karten, Chips, Dropdown, Freitext), Optionen bei „Wo hast du von uns gehört?“
- Fortschrittsanzeige, Animationen, Ton der Fragen, Danke-Zustand
- Ob es eine Zusammenfassung vor dem Absenden gibt

Deine Fragen samt Begründung trägst du in `VARIANTE.md` ein. So kann die Projektleitung die Formulare der verschiedenen Versionen vergleichen.

## Vorschlag zum Starten

Ziel: in unter 2 Minuten durch, eine Frage pro Schritt, motivierend statt bürokratisch.

| # | Frage | Feldtyp | Pflicht |
|---|---|---|---|
| 1 | Wie heißt du? | Vorname, Nachname | ja |
| 2 | Wie erreichen wir dich? | E-Mail, Telefon | ja |
| 3 | Was machst du gerade? | Schule / Studium / Job / Sonstiges + Freitext | Vorschlag |
| 4 | Welches Department reizt dich? | Mehrfachauswahl Karten + „Weiß ich noch nicht“ | ja |
| 5 | Wo hast du von uns gehört? | Instagram, LinkedIn, Freund:innen, Uni, Event, Google/KI-Suche, Sonstiges | ja |
| 6 | Was möchtest du bei uns lernen oder bewegen? | Freitext, max. 500 Zeichen | nein |
| 7 | Lebenslauf hochladen (PDF) | Datei | ja |
| 8 | Zusammenfassung + Einwilligung + Turnstile | Checkbox | ja |

Umgesetzt: „Interessiert mich“ bei einer Department-Karte führt auf `/mitmachen?department=<id>` und wählt das Department vor.

## Departments (fest, D6)

| Slug | Name |
|---|---|
| `operations` | Operations |
| `it` | IT |
| `finance` | Finance |
| `corporate-relations` | Corporate Relations |
| `marketing` | Marketing |
| `sustainability-compliance` | Sustainability Compliance |
| `legal` | Legal |
| `unentschieden` | Weiß ich noch nicht |

## Datenmodell (D1)

Pflichtspalten (fest). Weitere Spalten je nach gewählten Zusatzfragen ergänzen.

```sql
CREATE TABLE applications (
  id            TEXT PRIMARY KEY,          -- uuid
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  departments   TEXT NOT NULL,             -- JSON-Array mit Slugs
  source        TEXT NOT NULL,
  source_detail TEXT,
  consent_at    TEXT NOT NULL,
  review_state  TEXT NOT NULL DEFAULT 'neu' -- neu | kontaktiert | aufgenommen | abgelehnt
  -- + Spalten für Zusatzfragen
);
```

Tipp: Selten ausgewertete Zusatzfragen können auch gesammelt in einer Spalte `extra TEXT` (JSON) landen. Dann braucht nicht jede neue Frage eine Migration.

## Nach dem Absenden (fest)

1. Mail an `APPLICATION_RECIPIENTS` (join@, raphael.zaehrer@, patrik.stachura@innovaite.at) mit allen Angaben, `Reply-To` = Bewerber:in.
2. Bestätigungsmail an die Person.
3. Danke-Zustand auf `/mitmachen`.
4. Schlägt der Mailversand fehl, bleibt die Bewerbung trotzdem in D1 gespeichert (Fehler loggen, nicht der Person anzeigen).

## Sichtung und Löschung (fest)

- CSV-Export: `npx wrangler d1 execute innovaite-db --remote --command "SELECT * FROM applications" --json` (oder Skript `npm run export:applications`). Nur Projektleitung.
- Täglicher Cron-Trigger löscht Einträge, die älter als 12 Monate sind.
