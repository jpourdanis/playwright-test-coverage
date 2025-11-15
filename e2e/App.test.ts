import { test, expect } from "./baseFixtures";
import { convertHexToRGB, extractHexColor } from "./helper";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

interface Color {
  name: string;
  hex: string;
}

const colors: Color[] = [
  { name: "Turquoise", hex: "1abc9c" },
  { name: "Red", hex: "e74c3c" },
  { name: "Yellow", hex: "f1c40f" },
];

/**
 * Test: Verify that Turquoise is set as the default background color
 * Steps:
 * 1. Get the current color text from the page
 * 2. Extract the hex code from the current color placeholder
 * 3. Verify it matches the expected Turquoise hex code
 * 4. Convert hex to RGB for CSS validation
 * 5. Verify the header background color of the page matches the RGB values
 */
test("check Turquoise ( #1abc9c) is the default background color.", async ({
  page,
}) => {
  let currentColorText = await page
    .locator("text=Current color:")
    .textContent();
  let hex = extractHexColor(currentColorText);
  expect(hex).toBe(colors[0].hex);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});

/**
 * Test Suite: Background color tests
 *
 * This suite iterates over each color in the `colors` array and verifies:
 * 1. Clicking the color name applies the correct background color to the header.
 * 2. The displayed current color hex matches the expected hex code.
 * 3. The header's CSS background-color matches the expected RGB value.
 */
test.describe("Background color tests", () => {
  for (const color of colors) {
    test(`verify ${color.name} ( #${color.hex} ) is applied as the background color`, async ({
      page,
    }) => {
      // Click the color name to change the background color
      await page.click(`text=${color.name}`);

      // Get the current color text from the page
      const currentColorText = await page
        .locator("text=Current color:")
        .textContent();

      // Extract the hex code from the current color text
      const hex = extractHexColor(currentColorText);
      expect(hex).toBe(color.hex);

      // Convert hex to RGB for CSS validation
      const rgb = convertHexToRGB(`#${hex}`);

      // Verify the header background color matches the expected RGB value
      await expect(page.locator("header")).toHaveCSS(
        "background-color",
        `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`
      );
    });
  }
});
