import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "off",
  },
  /* Configure projects for major browsers */
  projects: [
    // Setup project
    {
      name: "ui-setup",
      use: {
        baseURL: "https://www.saucedemo.com/",
      },
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "ui-tests",
      testDir: "./tests/ui",
      use: {
        baseURL: "https://www.saucedemo.com/",
        ...devices["Desktop Chrome"],
        // Use prepared auth state.
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["ui-setup"],
    },

    {
      name: "api-tests",
      testDir: "./tests/api",
      use: {
        baseURL: "https://airportgap.com/api/",
      },
    },
  ],
});
