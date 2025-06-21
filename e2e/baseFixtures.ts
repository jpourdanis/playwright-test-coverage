import * as fs from "fs";
import * as path from "path";
import { test as baseTest } from "@playwright/test";
import { generateUUID } from "./helper";

/**
 * Directory where Istanbul will store coverage data
 * Uses the current working directory to create a .nyc_output folder
 */
const istanbulCLIOutput = path.join(process.cwd(), ".nyc_output");

/**
 * Removes the existing coverage directory if it exists
 * This ensures we start with a clean slate for each test run
 */
function cleanupCoverageDir() {
  if (fs.existsSync(istanbulCLIOutput)) {
    fs.rmSync(istanbulCLIOutput, { recursive: true, force: true });
    console.log(`Deleted existing .nyc_output folder`);
  }
}

// Initialize by cleaning up any previous coverage data
cleanupCoverageDir();

/**
 * Extended Playwright test fixture that adds code coverage collection
 * This adds Istanbul coverage support to all tests using this fixture
 */
export const test = baseTest.extend({
  context: async ({ context }, use) => {
    // Add script to collect coverage data before page unload
    await context.addInitScript(() =>
      window.addEventListener("beforeunload", () =>
        (window as any).collectIstanbulCoverage(
          JSON.stringify((window as any).__coverage__)
        )
      )
    );

    // Create directory for coverage data
    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true });

    // Expose function to browser context for collecting coverage data
    await context.exposeFunction(
      "collectIstanbulCoverage",
      (coverageJSON: string) => {
        if (coverageJSON) {
          // Write coverage data to a unique file
          fs.writeFileSync(
            path.join(
              istanbulCLIOutput,
              `playwright_coverage_${generateUUID()}.json`
            ),
            coverageJSON
          );
        }
      }
    );

    // Use the modified context in tests
    await use(context);

    // After tests complete, collect coverage data from all open pages
    for (const page of context.pages()) {
      await page.evaluate(() =>
        (window as any).collectIstanbulCoverage(
          JSON.stringify((window as any).__coverage__)
        )
      );
    }
  },
});

/**
 * Export the expect function for assertions in tests
 */
export const expect = test.expect;
