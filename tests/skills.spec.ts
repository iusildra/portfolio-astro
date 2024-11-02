import test, { expect } from "@playwright/test";

test.describe("Skills", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skills");
  });

  test("Has working inner links", async ({ page }) => {
    const myInfos = page.locator("#page-header");
    await myInfos.locator("a[href='#main-skills']").click();
    await expect(page.locator("#main-skills")).toBeInViewport();

    await myInfos.locator("a[href='#other-skills']").click();
    await expect(page.locator("#other-skills")).toBeInViewport();
  });

  test("Skills paragraph do not overflow", async ({ page }) => {
    const skills = await page
      .locator("#main-skills")
      .locator(".skill-card")
      .all();
    const rootFontSize = await page.locator("html").evaluate((html) => {
      return parseInt(window.getComputedStyle(html).fontSize);
    });

    for (const skill of skills) {
      const skillSizes = (await skill.boundingBox())!;
      const iconSizes = await skill.locator(".logo > svg").boundingBox();
      const paragraphs = await skill.locator("p").all();

      expect(iconSizes?.width).toBe(4 * rootFontSize);

      for (const paragraph of paragraphs) {
        const pSizes = await paragraph.boundingBox();
        expect(pSizes?.width).toBeLessThanOrEqual(
          skillSizes.width - 6 * rootFontSize,
        );
      }
    }
  });
});
