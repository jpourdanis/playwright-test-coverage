import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";

test.describe("Responsive Design Testing", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  // Example: iPhone SE dimensions
  test.use({ viewport: { width: 375, height: 667 } });

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
