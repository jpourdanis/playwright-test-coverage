import { test, expect } from "../baseFixtures";
import { HomePage } from "../pages/HomePage";

// Define the dataset for the data-driven tests
const testData = [
  { name: "Turquoise", expectedHex: "#1abc9c", expectedRgb: "rgb(26, 188, 156)" },
  { name: "Red", expectedHex: "#e74c3c", expectedRgb: "rgb(231, 76, 60)" },
  { name: "Yellow", expectedHex: "#f1c40f", expectedRgb: "rgb(241, 196, 15)" },
];

test.describe("Data-Driven Testing", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  // Loop over the dataset to dynamically generate tests
  for (const data of testData) {
    test(`changing color to ${data.name} should reflect in UI and DOM`, async ({
      page,
    }) => {
      // Act
      await homePage.clickColorButton(data.name);

      // Assert Text updates correctly
      await expect(homePage.currentColorText).toContainText(data.expectedHex);

      // Assert DOM styling updates correctly
      // We use page.locator directly here instead of exposing it via POM if we want
      // to check raw CSS properties that don't belong in a simple POM interface.
      await expect(homePage.header).toHaveCSS(
        "background-color",
        data.expectedRgb
      );
    });
  }
});
