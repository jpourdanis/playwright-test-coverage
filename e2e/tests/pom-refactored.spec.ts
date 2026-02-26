import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";
import { convertHexToRGB, extractHexColor } from "../helper";

const colors = [
  { name: "Turquoise", hex: "1abc9c" },
  { name: "Red", hex: "e74c3c" },
  { name: "Yellow", hex: "f1c40f" },
];

/**
 * Test Suite: POM Refactored
 * 
 * This suite demonstrates the Page Object Model (POM) pattern. Instead of using 
 * raw locators (e.g., page.locator), the tests use methods from `HomePage.ts`, 
 * which abstracts the page structure and improves test maintainability.
 */
test.describe("POM Refactored: Background color tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  for (const color of colors) {
    /**
     * Test: Verify applied background color via POM
     * 
     * Uses the methods and elements defined in the HomePage POM class to 
     * change the color and verify the new hexadecimal and RGB values. 
     */
    test(`verify ${color.name} ( #${color.hex} ) is applied as the background color`, async () => {
      await homePage.clickColorButton(color.name);
      const text = await homePage.getCurrentColorText();
      const hex = extractHexColor(text);
      expect(hex).toBe(color.hex);

      const rgb = convertHexToRGB(`#${hex}`);
      await expect(homePage.header).toHaveCSS(
        "background-color",
        `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`
      );
    });
  }
});
