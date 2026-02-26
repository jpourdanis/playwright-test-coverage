import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";

/**
 * Test Suite: Responsive Design Testing
 * 
 * This suite tests the application layout using specific viewport dimensions 
 * to ensure a proper user experience on smaller screens like mobile devices.
 */
test.describe("Responsive Design Testing", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  // Example: iPhone SE dimensions
  test.use({ viewport: { width: 375, height: 667 } });

  /**
   * Test: Render correctly on mobile viewport
   * 
   * Runs the test within an iPhone SE viewport (375x667). Validates that 
   * critical UI components (header, text, buttons) remain visible and functional
   * despite strict space constraints.
   */
  test("should render correctly on mobile viewport", async ({ page }) => {
    // Check that core elements remain visible on a small screen
    await expect(homePage.header).toBeVisible();
    await expect(homePage.currentColorText).toBeVisible();
    
    // Check for proper stacking or visibility of buttons
    await expect(homePage.turquoiseBtn).toBeVisible();
    await expect(homePage.redBtn).toBeVisible();
    await expect(homePage.yellowBtn).toBeVisible();

    // Verify button clicks still work
    await homePage.clickColorButton("Yellow");
    const hex = await homePage.getCurrentColorText();
    expect(hex).toContain("#f1c40f");
  });
});
