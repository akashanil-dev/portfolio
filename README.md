# akashanil.dev

My personal site — live at **[akashanil.dev](https://akashanil.dev)**.

![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## What's on it

- **Projects** — things I've built, like [Faber](https://faber.akashanil.dev)
- **Labs / Essays / Notes** — writing, once there is some
- **About** — who I am and where to find me

Sections only show up when they have something in them, so an empty collection is hidden from the nav and the homepage until a post is added.

## Running locally

```sh
git clone https://github.com/akashanil-dev/portfolio
cd portfolio
npm install
npm run dev        # http://localhost:4321
```

`npm run build` type-checks with `astro check`, then builds the static site into `dist/`.

## Adding things

**A project** — add an entry to `src/data/projects.ts`:

```ts
{
  name: "Thing",
  url: "https://thing.akashanil.dev",
  tagline: "One line about it.",
  blurb: "A couple of sentences on what it does.",
  tags: ["web app"],
}
```

**A post** — drop a Markdown file into `src/content/labs/`, `essays/` or `notes/`:

```md
---
title: "Post title"
description: "Short summary"
publishDate: 2026-10-10
tags: ["linux"]
readingTime: "4 min read"   # optional
featured: false             # optional
draft: false                # optional, true hides it
---

Post body here.
```

The schema lives in `src/content/config.ts`.

## Project structure

```
src/
├── components/   # cards, nav, footer
├── content/      # labs, essays, notes (Markdown)
├── data/         # projects.ts
├── layouts/      # BaseLayout (theme tokens), PostLayout
└── pages/        # routes, RSS feed, tag pages
public/           # static assets
```

## Deployment

Hosted on Vercel. Every push to `main` deploys to production, and other branches get preview deployments. The old version of the site lives on the `v1` branch.

## Credits

Originally based on a portfolio template by Oscar Hernandez (MIT, see [LICENSE](LICENSE)).
