import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright"; // 1
import config from "../src/config.json" assert { type: "json" };

test.describe("Accessibility", () => {
  config.links.forEach(({ href }) => {
    test(`${href} has no issue`, async ({ page }) => {
      await page.goto(`http://localhost:4321${href}`);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
