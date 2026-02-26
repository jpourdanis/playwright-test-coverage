import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";
import { convertHexToRGB, extractHexColor } from "../helper";

const colors = [
  { name: "Turquoise", hex: "1abc9c" },
  { name: "Red", hex: "e74c3c" },
  { name: "Yellow", hex: "f1c40f" },
];

test.describe("POM Refactored: Background color tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  for (const color of colors) {
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
