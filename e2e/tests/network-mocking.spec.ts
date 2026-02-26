import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";

/**
 * Test Suite: Network Mocking & Interception
 * 
 * Demonstrates how to intercept and mock network requests within Playwright
 * to simulate different application states (like missing assets or edge cases) 
 * without relying on a real backend.
 */
test.describe("Network Mocking & Interception", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  /**
   * Test: Handle missing image gracefully
   * 
   * Intercepts the request for the 'logo.svg' asset and forcibly aborts it. 
   * Validates that the application handles the failure gracefully by displaying 
   * the alternative "alt" text as a fallback.
   */
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

  /**
   * Test: Mock API response (example demonstration)
   * 
   * Demonstrates how to fulfill an intercepted request with mock JSON data.
   * Useful for testing specific frontend UI states like loaded data or errors 
   * without creating records in a database.
   */
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
