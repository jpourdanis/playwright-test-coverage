import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 120000, // 2 minutes timeout for server to start
    env: {
      USE_BABEL_PLUGIN_ISTANBUL: "1",
      NODE_OPTIONS: "--openssl-legacy-provider", // Add this to fix OpenSSL error
    },
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
    // launchOptions: {
    //   slowMo: 2000, // Slow down by 2 seconds
    // },
  },
};

export default config;
