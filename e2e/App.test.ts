import { test, expect } from "./baseFixtures";
import { convertHexToRGB, extractHexColor } from "./helper";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

interface Color {
  name: string;
  hex: string;
}

let TurquoiseColor: Color = { name: "Turquoise", hex: "1abc9c" };
let RedColor: Color = { name: "Red", hex: "e74c3c" };
let YellowColor: Color = { name: "Yellow", hex: "f1c40f" };

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
  expect(hex).toBe(TurquoiseColor.hex);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});

test("use Red ( #e74c3c) as a background color.", async ({ page }) => {
  await page.click(`text=${RedColor.name}`);

  let currentColorText = await page
    .locator("text=Current color:")
    .textContent();
  let hex = extractHexColor(currentColorText);
  expect(hex).toBe(RedColor.hex);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});

test("use Yellow ( #f1c40f) as a background color.", async ({ page }) => {
  await page.click(`text=${YellowColor.name}`);

  let currentColorText = await page
    .locator("text=Current color:")
    .textContent();
  let hex = extractHexColor(currentColorText);
  expect(hex).toBe(YellowColor.hex);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});

test("use Turquoise ( #1abc9c) as a background color.", async ({ page }) => {
  await page.click(`text=${TurquoiseColor.name}`);

  let currentColorText = await page
    .locator("text=Current color:")
    .textContent();
  let hex = extractHexColor(currentColorText);
  expect(hex).toBe(TurquoiseColor.hex);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});
