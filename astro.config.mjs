import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://iusildra.dev",
  integrations: [
    icon({
      include: {
        map: [
          "climbing"
        ],
        mdi: [
          "alternate-email",
          "bike",
          "book-open-variant",
          "car",
          "cook",
          "first-aid-kit",
          "github",
          "home",
          "hiking",
          "lambda",
          "link-variant",
          "linkedin",
          "martial-arts",
          "menu",
          "menu-left",
          "party-popper",
          "rabbit",
          "swim",
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
