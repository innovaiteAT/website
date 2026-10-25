import { z } from 'astro/zod';

// Pflicht-Rahmen laut docs/APPLICATION-FLOW.md. Alles andere aus dem Formular landet in `extra`.
export const applicationSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  departments: z.array(z.string().max(60)).min(1),
  source: z.string().trim().min(1).max(100),
  sourceDetail: z.string().trim().max(300).optional(),
  consent: z.literal('on'),
});

export type Application = z.infer<typeof applicationSchema> & { extra: Record<string, string> };

const KNOWN_FIELDS = new Set([...Object.keys(applicationSchema.shape), 'cf-turnstile-response']);

export function parseApplication(form: FormData, allowedDepartments: string[]) {
  const departments = form.getAll('departments').map(String);
  const result = applicationSchema.safeParse({
    ...Object.fromEntries([...form.entries()].filter(([key]) => key !== 'departments')),
    sourceDetail: form.get('sourceDetail') || undefined,
    departments,
  });
  if (!result.success) return { ok: false as const, issues: result.error.issues };
  if (departments.some((d) => !allowedDepartments.includes(d))) {
    return { ok: false as const, issues: [{ path: ['departments'], message: 'Unbekanntes Department' }] };
  }

  const extra: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (!KNOWN_FIELDS.has(key) && typeof value === 'string' && value.trim()) {
      extra[key] = value.trim().slice(0, 1000);
    }
  }
  return { ok: true as const, data: { ...result.data, extra } satisfies Application };
}
