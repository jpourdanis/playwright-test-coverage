import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { test as baseTest } from '@playwright/test';

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output');

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Delete the .nyc_output directory if it exists
function cleanupCoverageDir() {
  if (fs.existsSync(istanbulCLIOutput)) {
    fs.rmSync(istanbulCLIOutput, { recursive: true, force: true });
    console.log(`Deleted existing .nyc_output folder`);
  }
}

// Clean up before the first test runs
cleanupCoverageDir();

export const test = baseTest.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () =>
        (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
      ),
    );
    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true });
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON)
        fs.writeFileSync(path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`), coverageJSON);
    });
    await use(context);
    for (const page of context.pages()) {
      await page.evaluate(() => (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__)))
    }
  }
});

export const expect = test.expect;
