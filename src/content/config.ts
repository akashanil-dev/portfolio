import { defineCollection, z } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  readingTime: z.string().default("5 min read"),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const labs = defineCollection({
  type: "content",
  schema: postSchema,
});

const essays = defineCollection({
  type: "content",
  schema: postSchema,
});

const notes = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = { labs, essays, notes };
