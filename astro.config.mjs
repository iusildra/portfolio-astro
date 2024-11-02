// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://iusildra.dev",
  integrations: [
    icon({
      include: {
        mdi: [
          "alternate-email",
          "bike",
          "book-open-variant",
          "car",
          "first-aid-kit",
          "github",
          "home",
          "lambda",
          "link-variant",
          "linkedin",
          "menu",
          "menu-left",
          "rabbit",
          "twitter",
        ],
        logos: [
          "archlinux",
          "aws-ec2",
          "aws-s3",
          "docker-icon",
          "git-icon",
          "github-icon",
          "graphql",
          "grafana",
          "grpc",
          "java",
          "javascript",
          "json-schema-icon",
          "kibana",
          "linux-tux",
          "mysql",
          "postgresql",
          "react",
          "rust",
          "scala",
          "svelte-icon",
          "terraform-icon",
          "typescript-icon",
          "visual-studio-code",
          "vue",
        ],
      },
    }),
  ],
});
