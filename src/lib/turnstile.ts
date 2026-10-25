// Prüft das Turnstile-Token serverseitig. https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
export async function verifyTurnstile(token: string | null, secret: string, ip?: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
