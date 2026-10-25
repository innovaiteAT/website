// Alle sichtbaren UI-Texte. Wiederkehrende Inhalte (Team, FAQ, Departments, Partner) liegen in src/content/.
// Später kommt en.ts mit derselben Struktur dazu.
export const de = {
  meta: {
    title: 'innovAIte – KI-Studierendeninitiative in Wien',
    description:
      'innovAIte ist eine gemeinnützige Studierenden-Initiative in Wien. Wir bringen KI, Automatisierung und Optimierung in Unternehmen. Kostenlos mitmachen!',
  },
  skipLink: 'Zum Inhalt springen',
  cta: 'Mitglied werden!',
  nav: {
    label: 'Hauptnavigation',
    items: [
      { href: '#ueber-uns', label: 'Über uns' },
      { href: '#was-wir-machen', label: 'Was wir machen' },
      { href: '#partner', label: 'Partner' },
      { href: '#team', label: 'Team' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  hero: {
    claim: 'Dein Weg zu Wissen und Wachstum.',
    lead: 'innovAIte ist eine gemeinnützige Studierenden-Initiative in Wien. Wir erforschen KI gemeinsam, nutzen sie verantwortungsvoll und bringen Automatisierung und Optimierung in Unternehmen.',
  },
  fuerDich: {
    title: 'Hier bist du richtig, wenn du …',
    items: [
      'deine Leidenschaft zu echter Expertise machen willst.',
      'lieber aktiv lernst als nur zuhörst.',
      'in einer Gemeinschaft wachsen möchtest.',
      'KI als Werkzeug für deine Ziele nutzen willst.',
    ],
  },
  ueberUns: {
    title: 'Wer wir sind',
    lead: 'Wir sind Studierende aus Wien, die KI verstehen und sinnvoll einsetzen wollen. Wir entwickeln keine KI, wir lernen, sie richtig zu nutzen. Ehrenamtlich, gemeinnützig und offen für alle.',
    goalsTitle: 'Unsere Kernziele',
    goals: [
      { title: 'Persönliches Wachstum', text: 'Du lernst Neues, übernimmst Verantwortung und entwickelst dich weiter.' },
      { title: 'Soziale Gemeinschaft', text: 'Du findest Gleichgesinnte und baust dir ein Netzwerk für deine Karriere auf.' },
      { title: 'Technologische Exzellenz', text: 'Du arbeitest an echten Projekten mit aktuellen KI-Werkzeugen.' },
    ],
  },
  wasWirMachen: {
    title: 'Was wir machen',
    lead: 'Wir bringen Automatisierungen, Optimierungen und KI in Unternehmen. Jedes Department arbeitet dabei eigenständig an seinen Themen.',
    items: [
      { title: 'KI einführen', text: 'Wir zeigen Unternehmen, wo KI im Alltag wirklich hilft, und setzen es gemeinsam um.' },
      { title: 'Prozesse automatisieren', text: 'Wiederkehrende Aufgaben laufen danach von allein.' },
      { title: 'Abläufe optimieren', text: 'Wir finden, was Zeit kostet, und machen es schlanker.' },
    ],
  },
  departments: {
    title: 'Unsere Departments',
    lead: 'Bei innovAIte arbeitest du in einem Department. Jedes hat eigene Aufgaben und Projekte.',
    interest: 'Interessiert mich',
  },
  partner: {
    title: 'Unsere Partner',
    lead: 'Mit diesen Partnern setzen wir Projekte um.',
  },
  statement: {
    title: 'Nicht KI nimmt dir den Job. Sondern Menschen, die KI nutzen können.',
    text: 'Deshalb lernen wir, KI zu verstehen und richtig einzusetzen. Nicht kompliziert. Nicht elitär. Sondern relevant. Offen. Und gemeinsam.',
  },
  team: {
    title: 'Meet the Team!',
    lead: 'Hinter innovAIte stehen Studierende, die gemeinsam etwas bewegen.',
    groups: { leitung: 'Leitung', team: 'Team', associates: 'Associates' },
  },
  faq: {
    title: 'Häufige Fragen',
  },
  mitmachen: {
    title: 'Werde Teil des Teams!',
    lead: 'Mitmachen ist kostenlos und braucht keine Vorkenntnisse. Füll das Formular aus, wir melden uns bei dir.',
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      departments: 'Welche Departments interessieren dich?',
      unsure: 'Weiß ich noch nicht',
      source: 'Wo hast du von uns gehört?',
      sourcePlaceholder: 'Bitte auswählen',
      sourceDetail: 'Magst du das genauer sagen? (optional)',
      consent: 'Ich bin einverstanden, dass innovAIte meine Angaben zur Bearbeitung meiner Bewerbung speichert.',
      consentLink: 'Datenschutzerklärung',
    },
    sources: ['Instagram', 'LinkedIn', 'Freund:innen', 'Uni / Lehrveranstaltung', 'Event', 'Google / KI-Suche', 'Sonstiges'],
    submit: 'Absenden',
    sending: 'Wird gesendet …',
    thanksTitle: 'Danke für deine Bewerbung!',
    thanksText: 'Wir haben deine Angaben bekommen und melden uns bald bei dir. Bis dahin findest du uns auf Instagram und LinkedIn.',
    errorTitle: 'Das hat leider nicht geklappt.',
    errorText: 'Bitte prüfe deine Angaben und versuch es noch einmal. Wenn es weiter nicht klappt, schreib uns eine E-Mail.',
  },
  footer: {
    navTitle: 'Navigation',
    legalTitle: 'Rechtliches',
    contactTitle: 'Kontakt',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite gibt es nicht. Alles Wichtige findest du auf der Startseite.',
    back: 'Zur Startseite',
  },
} as const;
