import AxeBuilder from "@axe-core/playwright"; // 1
import { expect, test } from "@playwright/test";
import config from "../src/config.json" assert { type: "json" };

test.describe("Accessibility", () => {
  [{ name: "Home", href: "/" }, ...config.links].forEach(({ href }) => {
    test(`${href} has no issue`, async ({ page, isMobile }) => {
      test.fixme(
        isMobile && href === "/skills",
        "Main skills description paragraphs are not keyboard focusable",
      );
      test.fixme(
        isMobile && href === "/",
        "Unknown element with too low contrast",
      );
      await page.goto(`${href}`);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
