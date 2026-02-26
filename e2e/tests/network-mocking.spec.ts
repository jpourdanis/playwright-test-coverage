import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";

test.describe("Network Mocking & Interception", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test("should handle missing image gracefully by showing alt text", async ({
    page,
  }) => {
    // Intercept requests for the logo and abort them
    await page.route("**/logo.svg", (route) => route.abort());

    // Now go to the page
    await homePage.goto();

    // The image won't load, but it should still be in the DOM
    const logoImg = page.locator("img.App-logo");
    
    // We expect the image element to exist
    await expect(logoImg).toBeVisible();
    
    // And verify the alt text is present for screen readers/fallback
    await expect(logoImg).toHaveAttribute("alt", "logo");
  });

  test("mock API response (example demonstration)", async ({ page }) => {
    // Imagine our app fetches a greeting phrase from an API.
    // We can mock that response before loading the page.
    await page.route("**/api/config", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ defaultColor: "Red" }),
      });
    });

    await homePage.goto();
    
    // Even though the app doesn't currently use this API, this demonstrates
    // the pattern of mocking data for tests instead of hitting real backends.
    await expect(homePage.header).toBeVisible();
  });
});
