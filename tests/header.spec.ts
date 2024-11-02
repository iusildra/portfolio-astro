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

  test.skip("Has clickable links on large screens", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile);

    expect(await page.locator("#header-dropdown").isHidden()).toBe(true);

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

    expect(await header.locator(".links").isHidden()).toBe(true);

    await header.locator("div > #header-dropdown").click();
    const dropDownLinks = await header
      .locator("#dropdown-content")
      .locator("a")
      .all();

    expect(await transformRawAnchors(dropDownLinks)).toEqual(config.links);
  });
});
