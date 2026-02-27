import { PlaywrightTestConfig, devices } from "@playwright/test";

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
        ...devices["Desktop Chrome"],
      },
    },
    ...(process.env.CROSS_BROWSER === "true"
      ? [
          {
            name: "Firefox",
            use: {
              ...devices["Desktop Firefox"],
            },
            testMatch: /.*cross-browser\.spec\.ts/,
          },
          {
            name: "WebKit",
            use: {
              ...devices["Desktop Safari"],
            },
            testMatch: /.*cross-browser\.spec\.ts/,
          },
        ]
      : []),
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
  reporter: process.env.CI
    ? [
        ["allure-playwright"],
        ["list"],
      ]
    : [
        ["html", { open: "never" }],
        ["allure-playwright"],
        ["list"],
      ],
};

export default config;
