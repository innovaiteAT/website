import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { env } from 'cloudflare:workers';
import { parseApplication } from '../../lib/application';
import { sendApplicationMails } from '../../lib/mail';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

// Cloudflare-Testschlüssel, damit lokal auch ohne .dev.vars alles läuft.
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const fail = (status: number, issues: unknown = undefined) =>
    wantsJson ? Response.json({ ok: false, issues }, { status }) : redirect('/#fehler', 303);

  const form = await request.formData();

  const secret = env.TURNSTILE_SECRET || (import.meta.env.DEV ? TURNSTILE_TEST_SECRET : '');
  const human = await verifyTurnstile(
    form.get('cf-turnstile-response')?.toString() ?? null,
    secret,
    request.headers.get('CF-Connecting-IP'),
  );
  if (!human) return fail(403);

  const departments = (await getCollection('departments')).map((d) => d.id);
  const parsed = parseApplication(form, [...departments, 'unentschieden']);
  if (!parsed.ok) return fail(400, parsed.issues);

  const app = parsed.data;
  await env.DB.prepare(
    `INSERT INTO applications (id, first_name, last_name, email, departments, source, source_detail, extra, consent_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`,
  )
    .bind(
      crypto.randomUUID(),
      app.firstName,
      app.lastName,
      app.email,
      JSON.stringify(app.departments),
      app.source,
      app.sourceDetail ?? null,
      Object.keys(app.extra).length ? JSON.stringify(app.extra) : null,
      new Date().toISOString(),
    )
    .run();

  // Mailfehler dürfen die gespeicherte Bewerbung nicht scheitern lassen.
  try {
    await sendApplicationMails(app, env);
  } catch (error) {
    console.error('[mail] Versand fehlgeschlagen', error);
  }

  return wantsJson ? Response.json({ ok: true }) : redirect('/#danke', 303);
};
