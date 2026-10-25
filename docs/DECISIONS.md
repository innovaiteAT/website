# Entscheidungen

Hier stehen nur die **festen** Entscheidungen. Sie gelten für jede Version und ändert nur die Projektleitung. Eigene Entscheidungen hält jedes Mitglied in `VARIANTE.md` der eigenen Version fest.

## Fest

| # | Entscheidung | Begründung |
|---|---|---|
| D1 | Astro statt Next.js/SvelteKit | Statisch zuerst, bestes SEO, minimales JS, erstklassiger Cloudflare-Support |
| D2 | Cloudflare Workers + Static Assets statt Pages | Cloudflares empfohlener Weg für neue Projekte, D1/Turnstile direkt gebunden |
| D3 | Kein CMS, Inhalte im Repo | Kleines Team, technisch versiert, keine Zusatzkosten |
| D4 | Eigenes CSS mit Brand-Tokens statt Tailwind | Tokens existieren schon, weniger Abhängigkeiten, Brand bleibt exakt |
| D5 | Website bleibt ein One-Pager | Vorgabe des Vereins. Nur Impressum, Datenschutz und 404 als eigene URLs. Bewerbung als Sektion `#mitmachen`. |
| D6 | Departments: Operations, IT, Finance, Corporate Relations, Marketing, Sustainability Compliance, Legal | Vorgabe des Vereins. Im Wizard zusätzlich „Weiß ich noch nicht“. |
| D7 | Mailversand über Cloudflare Email Service | Alles bei Cloudflare, kein weiterer Auftragsverarbeiter. Absender z. B. `noreply@innovaite.at`. |
| D8 | Bewerbungen gehen an `join@innovaite.at`, `raphael.zaehrer@innovaite.at`, `patrik.stachura@innovaite.at` | Empfänger als Variable `APPLICATION_RECIPIENTS` in `wrangler.jsonc`, nicht im Code. |
| D9 | Sichtung per Mail + CSV-Export aus D1 | Geringster Aufwand. Admin-Ansicht bei Bedarf später. |
| D10 | Bewerbungsdaten werden nach 12 Monaten gelöscht | Täglicher Cron-Trigger im Worker. In der Datenschutzerklärung nennen. |
| D11 | Nur Deutsch, Englisch vorbereitet | Alle Texte in Content Collections bzw. `src/i18n/de.ts`, keine Strings in Komponenten. `/en` kommt später dazu. |
| D12 | Cloudflare Web Analytics | Cookielos, kein Cookie-Banner. Google-/Facebook-Remarketing entfällt. |
| D14 | Keine Weekly-Projekte mehr. Fokus: Automatisierungen, Optimierungen und KI in Unternehmen einführen; Departments arbeiten eigenständig | Neue Ausrichtung des Vereins (25.10.2026). Sektion „Angebote“ wird zu `#was-wir-machen`. |
| D15 | Eigene Sektion `#partner` mit Torino, Basenbox, WU Wien, Raiffeisen Software, Roiss-Weiss GmbH | Partnerschaften zeigen Glaubwürdigkeit (auch für SEO/AEO). Logos in `design/partners/`. |
| D16 | Hero-Text ist fest und wird wortwörtlich übernommen (Titel, Claim, Text siehe CLAUDE.md) | Vorgabe des Vereins (25.10.2026) |
| D17 | Im Hero-Titel ist „AI“ weiß statt rot. Logo und Wortmarke anderswo bleiben mit rotem „AI“ | Vorgabe des Vereins (25.10.2026) |
| D13 | Keine Redirects nötig | Alte Sitemap hat nur `/`, `/impressum`, `/datenschutzerklaerung`, genau unsere URLs. |

## Domain und DNS (Ist-Stand 25.10.2026)

- Nameserver: `ns1–ns4.helloly.com` (beim bisherigen Website-Anbieter)
- MX: `smtp.google.com` → **Google Workspace** für alle `@innovaite.at`-Adressen
- TXT: nur `google-site-verification`, **kein SPF, kein DMARC**

### Vorgehen beim Umzug (Phase 6)

1. Beim bisherigen Anbieter klären: Auth-Code für Domain-Transfer oder Nameserver-Änderung erlaubt? Wer im Verein hat den Login?
2. Domain in Cloudflare als Zone anlegen. **Vorher alle bestehenden DNS-Einträge exportieren** und in Cloudflare übernehmen, vor allem MX und TXT, sonst fallen die Google-Workspace-Postfächer aus.
3. SPF ergänzen: `v=spf1 include:_spf.google.com include:<cloudflare-email> ~all` (genauen Include laut Cloudflare-Doku), DKIM für Google und Cloudflare, DMARC mit `p=none` starten.
4. Nameserver umstellen, Website als Custom Domain an den Worker hängen, `www` → Apex.
5. Mails testen (Empfang Google, Versand Worker), erst danach den alten Anbieter kündigen.

## Offen

- [ ] **Login beim bisherigen Anbieter**: Wer hat ihn, und ist Transfer bzw. Nameserver-Wechsel möglich?
- [ ] **Google Workspace**: Admin-Zugang für DKIM-Schlüssel klären
- [ ] **Department-Texte**: 2 bis 3 Sätze pro Department, was man dort macht, plus Lead (Name aus dem Team)
- [ ] **`join@innovaite.at`**: Existiert das Postfach oder die Gruppe schon in Google Workspace?
- [ ] **Partner**: Logos in `design/partners/` ablegen, Zustimmung zur Logo-Nutzung einholen, exakte Schreibweise und Website je Partner bestätigen
- [ ] **Partner-Texte**: ein Satz pro Partner, was wir zusammen machen
- [ ] **Antwortzeit**: Was versprechen wir in der Bestätigungsmail („innerhalb von X Tagen“)?
