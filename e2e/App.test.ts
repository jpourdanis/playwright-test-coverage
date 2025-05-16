import { test, expect } from "./baseFixtures";
import { convertHexToRGB, extractHexColor } from "./helper";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("check Turquoise ( #1abc9c) is the default background color.", async ({
  page,
}) => {
  let currentColorText = await page
    .locator("text=Current color:")
    .textContent();
  let hex = extractHexColor(currentColorText);
  let rgbColors = convertHexToRGB(`#${hex}`);
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
  );
});

// test("use Red ( #e74c3c) as a background color", async ({ page }) => {
//   await page.click("text=Red");

//   let currentColorText = await page
//     .locator("text=Current color:")
//     .textContent();
//   let hex = extractHexColor(currentColorText);
//   let rgbColors = convertHexToRGB(`#${hex}`);
//   await expect(page.locator("header")).toHaveCSS(
//     "background-color",
//     `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
//   );
// });

// test("use Yellow ( #f1c40f) as a background color", async ({ page }) => {
//   await page.click("text=Yellow");

//   let currentColorText = await page
//     .locator("text=Current color:")
//     .textContent();
//   let hex = extractHexColor(currentColorText);
//   let rgbColors = convertHexToRGB(`#${hex}`);
//   await expect(page.locator("header")).toHaveCSS(
//     "background-color",
//     `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`
//   );
// });
