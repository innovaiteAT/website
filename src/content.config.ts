import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const team = defineCollection({
  loader: file('src/content/team.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['leitung', 'team', 'associates']),
    order: z.number(),
    linkedin: z.url().optional(),
  }),
});

const departments = defineCollection({
  loader: file('src/content/departments.json'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const partners = defineCollection({
  loader: file('src/content/partners.json'),
  schema: z.object({
    name: z.string(),
    url: z.url().optional(),
    description: z.string().optional(),
    order: z.number(),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
  }),
});

export const collections = { team, departments, partners, faq };
