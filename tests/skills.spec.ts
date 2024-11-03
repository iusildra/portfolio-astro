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

  test("Skills paragraph do not overflow", async ({ page, isMobile }) => {
    const skills = await page
      .locator("#main-skills")
      .locator(".skill-card")
      .all();

    for (const skill of skills) {
      await skill.scrollIntoViewIfNeeded();
      const { x: skillX, width: skillWidth } = (await skill.boundingBox())!;
      const { width: iconWidth } = (await skill
        .locator(".logo")
        .boundingBox())!;
      const elements = await skill
        .locator(".description")
        .filter()
        .all();

      for (const element of elements) {
        const { x: elX, width: elWidth } = (await element.boundingBox())!;
        if (isMobile) {
          expect(elX).toBeGreaterThanOrEqual(skillX);
          expect(elX + elWidth).toBeLessThanOrEqual(skillX + skillWidth);
        } else {
          expect(elWidth).toBeLessThanOrEqual(skillWidth - iconWidth);
        }
      }
    }
  });
});
