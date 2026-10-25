import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

type GraphNode = Record<string, unknown>;

export function organization(founders: CollectionEntry<'team'>[] = []): GraphNode {
  return {
    '@type': 'NGO',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    image: `${SITE.url}/og.png`,
    email: SITE.email,
    nonprofitStatus: 'Nonprofit',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
    knowsAbout: ['Künstliche Intelligenz', 'Automatisierung', 'Prozessoptimierung', 'KI-Einführung in Unternehmen'],
    founder: founders.map((p) => ({ '@type': 'Person', name: p.data.name, jobTitle: p.data.role })),
  };
}

export function website(): GraphNode {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE.url, name: SITE.name, inLanguage: SITE.locale, publisher: { '@id': ORG_ID } };
}

export function faqPage(entries: CollectionEntry<'faq'>[]): GraphNode {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.data.question,
      acceptedAnswer: { '@type': 'Answer', text: e.data.answer },
    })),
  };
}

export function graph(...nodes: GraphNode[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
