import { test, expect } from "./baseFixtures";

test.describe("Visual regression", () => {
  test("homepage should match snapshot", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Red");
    await page.waitForSelector("header");

    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchSnapshot("home.png");
  });
});
