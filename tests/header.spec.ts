import { test, expect, type Locator } from "@playwright/test";
import config from "../src/config.json" assert { type: "json" };

interface Anchor {
  name: string | undefined;
  href: string | null;
}

test.describe("Header", () => {
  const transformRawAnchors = async (anchors: Locator[]): Promise<Anchor[]> => {
    return await Promise.all(
      anchors.map(async (e) => {
        const name = await e.textContent().then((t) => t?.trim());
        const href = await e.getAttribute("href");
        return { name, href };
      }),
    );
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Has clickable links on large screens", async ({ page, isMobile }) => {
    test.skip(isMobile);

    await expect(page.locator("#header-dropdown")).toBeHidden();

    const rawLinks = await page
      .locator("header")
      .locator("div.links")
      .locator("a")
      .all();

    expect(await transformRawAnchors(rawLinks)).toEqual(config.links);
  });

  test("Has clickable dropdown menu on small screens", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile);
    const header = page.locator("header");

    await expect(header.locator(".links")).toBeHidden();

    await header.locator("#header-dropdown").tap();
    const dropDownLinks = await header
      .locator("#dropdown-content")
      .locator("a")
      .all();

    expect(await transformRawAnchors(dropDownLinks)).toEqual(config.links);
  });
});
