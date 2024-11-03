import { test, expect } from "@playwright/test";
import config from "../src/config.json" assert { type: "json" };

test.describe.serial("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Is correct", async ({ page }) => {
    await expect(page.locator("header").nth(0)).toBeVisible(); // The dev toolbar contains a header
    await expect(page).toHaveTitle(config.index.title);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("landing.png");
  });

  test("Has working inner links", async ({ page }) => {
    const myInfos = page.locator("#my-info");
    await myInfos.locator("a[href='#about-me']").click();
    await expect(page.locator("#about-me")).toBeInViewport();

    await myInfos.locator("a[href='#hobbies']").click();
    await expect(page.locator("#hobbies")).toBeInViewport();
  });
});
