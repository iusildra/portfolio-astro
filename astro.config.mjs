// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://iusildra.github.io/portfolio-astro",
  base: process.env.ENV == "production" ? "portfolio-astro" : "",
  integrations: [icon()],
});
