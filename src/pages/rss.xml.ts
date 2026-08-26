import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const [labs, essays, notes] = await Promise.all([
    getCollection("labs", ({ data }) => !data.draft),
    getCollection("essays", ({ data }) => !data.draft),
    getCollection("notes", ({ data }) => !data.draft),
  ]);

  const allPosts = [
    ...labs.map((p) => ({ ...p, section: "labs" })),
    ...essays.map((p) => ({ ...p, section: "essays" })),
    ...notes.map((p) => ({ ...p, section: "notes" })),
  ].sort(
        (a, b) =>
          new Date(b.data.publishDate).getTime() -
          new Date(a.data.publishDate).getTime()
      );

  return rss({
    title: "Akash A — akashanil.dev",
    description:
      "Infrastructure systems, Linux, observability, and the architecture beneath modern software.",
    site: context.site ?? "https://akashanil.dev",
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/${post.section}/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
