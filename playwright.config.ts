import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // Directory containing Playwright tests
  testDir: "e2e",
  // Where to store visual snapshots
  snapshotDir: "e2e/snapshots",
  // Template used for snapshot paths
  snapshotPathTemplate: "e2e/snapshots/{arg}{ext}",
  // When running in CI/Docker we expect the app to be started externally
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run start",
        port: 3000,
        timeout: 120000, // 2 minutes timeout for server to start
        env: {
          USE_BABEL_PLUGIN_ISTANBUL: "1",
          NODE_OPTIONS: "--openssl-legacy-provider", // Add this to fix OpenSSL error
        },
        reuseExistingServer: true,
      },
  projects: [
    {
      name: "Chrome",
      use: {
        browserName: "chromium",
      },
    },
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    // launchOptions: {
    //   slowMo: 2000, // Slow down by 2 seconds
    // },
  },
};

export default config;
