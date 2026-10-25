import type { Application } from './application';

interface MailEnv {
  APPLICATION_RECIPIENTS: string;
  MAIL_FROM: string;
}

// Benachrichtigt das Team und bestätigt der Person den Eingang.
// In der Entwicklung wird nur geloggt. Produktion: Cloudflare Email Service (TODO Projektleitung, siehe wrangler.jsonc).
export async function sendApplicationMails(app: Application & { cvKey: string }, env: MailEnv): Promise<void> {
  const recipients = env.APPLICATION_RECIPIENTS.split(',').map((r) => r.trim());
  const summary = [
    `Name: ${app.firstName} ${app.lastName}`,
    `E-Mail: ${app.email}`,
    `Telefon: ${app.phone}`,
    `Lebenslauf (R2): ${app.cvKey}`,
    `Departments: ${app.departments.join(', ')}`,
    `Gehört über: ${app.source}${app.sourceDetail ? ` (${app.sourceDetail})` : ''}`,
    ...Object.entries(app.extra).map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  if (import.meta.env.DEV) {
    console.info(`[mail] An ${recipients.join(', ')} von ${env.MAIL_FROM}\n${summary}`);
    console.info(`[mail] Bestätigung an ${app.email}`);
    return;
  }

  console.warn('[mail] Mailversand ist noch nicht eingerichtet. Bewerbung ist in D1 gespeichert.');
}
