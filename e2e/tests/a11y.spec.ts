import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";
import AxeBuilder from "@axe-core/playwright";

/**
 * Test Suite: Accessibility Tests
 * 
 * This suite demonstrates how to use @axe-core/playwright to run accessibility 
 * audits against the DOM. It ensures that the application complies with 
 * accessibility WCAG guidelines.
 */
test.describe("Accessibility Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  /**
   * Test: Automatically detectable accessibility issues
   * 
   * Scans the initial page state for any accessibility violations, ensuring
   * that elements like headings, ARIA tags, and contrast are compliant.
   */
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    // Wait for the main elements to render
    await expect(homePage.header).toBeVisible();

    // Run Axe to check for accessibility violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Verify there are no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  /**
   * Test: Accessibility after state change
   * 
   * Verifies that the application remains accessible after user interactions,
   * specifically ensuring that color contrast ratios remain valid when the 
   * background color changes dynamically.
   */
  test("should maintain accessibility after state change (color update)", async ({
    page,
  }) => {
    // Change color to verify contrast and other rules still pass
    await homePage.clickColorButton("Yellow");
    
    // Wait for the color change to apply (indicated by the text changing)
    await expect(homePage.currentColorText).toContainText("#f1c40f");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // We specifically check contrast rules after a background color change
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === "color-contrast"
    );
    expect(contrastViolations).toEqual([]);
  });
});
