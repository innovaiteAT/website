// Feste Vereinsdaten. Werden in Layout, Footer, Impressum und JSON-LD verwendet.
export const SITE = {
  name: 'innovAIte',
  legalName: 'innovAIte – Initiative für künstliche Intelligenz und digitale Innovation von Studierenden',
  url: 'https://innovaite.at',
  locale: 'de-AT',
  email: 'innovaite-verein@outlook.com',
  zvr: '1938148619',
  address: {
    street: 'Keinergasse 8',
    postalCode: '1030',
    city: 'Wien',
    country: 'AT',
  },
  social: {
    instagram: 'https://www.instagram.com/innovaite.at/',
    linkedin: 'https://www.linkedin.com/company/innovaitevienna/',
  },
  // Vorerst zeigt jedes Foto auf der Seite den Platzhalter (Cosmo). Auf false setzen, sobald echte Fotos da sind.
  photosPlaceholderOnly: true,
  // Öffentlicher Turnstile-Schlüssel. Ohne Angabe gilt der Cloudflare-Testschlüssel (lässt immer durch).
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
} as const;
