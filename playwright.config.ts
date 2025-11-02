// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";
import fs from "fs";

const ENV = process.env.ENV || "qa";
dotenv.config({ path: `./env/.env.${ENV}` });

const isCI = !!process.env.CI;
const authDir = path.join(__dirname, ".auth");
const authFile = path.join(authDir, "user.json");

// Ensure the .auth directory exists
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

const commonUse = {
  viewport: null,
  baseURL: process.env.URL,
  headless: isCI,
  slowMo: isCI ? 0 : 200,
  trace: "on-first-retry" as const,
  colorScheme: "dark" as const,
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ["geolocation"] as const,
  launchOptions: { slowMo: 50 },
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,
  reporter: "html",

  use: {
    ...commonUse,
  },

  projects: [
    // 1) Setup project — logs in and saves authFile
    {
      name: "setup",
      testDir: "./helper",
      testMatch: ["global.auth.setup.spec.ts"],
      use: {
        ...commonUse,
        // storageState: authFile, // setup test will write to this file
        ...devices["Desktop Chrome"],
      },
    },

    // 2) Authenticated tests — reuse saved storage state
    {
      name: "authenticated",
      testMatch: "e2e/auth/**/*.spec.ts",
      dependencies: ["setup"],
      use: {
        ...commonUse,
        storageState: authFile,
        ...devices["Desktop Chrome"],
      },
    },

    // 3) Unauthenticated tests
    {
      name: "unauthenticated",
      testMatch: "e2e/unauth/**/*.spec.ts",
      use: {
        ...commonUse,
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
