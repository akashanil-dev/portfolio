// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://akashanil.dev",
  integrations: [sitemap()],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    optimizeDeps: {
      include: ["zwitch"],
    },
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
});
