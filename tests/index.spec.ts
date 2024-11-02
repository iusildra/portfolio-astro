import { test, expect } from "@playwright/test";
import config from "../src/config.json" assert { type: "json" };
import { assert } from "console";

test.describe("Landing page", () => {
  test("Is correct", async ({ page }) => {
    await expect(page).toHaveTitle(config.index.title);
    assert(page.locator("header").isVisible());
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
