import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as fs from "fs"; // Changed to import * as fs to be compatible with ESM

// --- ES Module Fix for __dirname and __filename ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ---------------------------------------------------

const ENV = process.env.ENV || "qa";
// Use join with __dirname to resolve the environment file path reliably
dotenv.config({ path: join(__dirname, `env/.env.${ENV}`) });

const isCI = !!process.env.CI;
// Use join with the defined __dirname for reliable path construction
const authDir = join(__dirname, ".auth");
const authFile = join(authDir, "user.json");

// Ensure the .auth directory exists
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

const commonUse = {
  viewport: null,
  baseURL: process.env.URL,
  headless: isCI,
  slowMo: isCI ? 0 : 50, // Reduced slowMo for better performance, added 50 as default
  trace: "on-first-retry" as const,
  colorScheme: "dark" as const,
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ["geolocation"] as const,
};

export default defineConfig({
  // FIX: Replaced require.resolve() with join(__dirname, '...')
  globalSetup: join(__dirname, "./helper/globalSetup"), // Ping Test

  // Set root testDir to the project root, letting individual projects define their sub-dirs.
  // This is cleaner when mixing e2e, api, and unit-tests.
  testDir: "./",
  
  // FIX: Ignore the unit-tests directory globally to prevent Vitest/Jest matchers conflict
  // when running generic 'playwright test' without specifying projects.
  testIgnore: ["**/unit-tests/**"],

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,
  reporter: "html",

  use: {
    ...commonUse,
  },

  projects: [
    // 0) Unit Tests Project - Defines path/config for unit tests (run via 'npm run test:unit')
    {
      name: "unit-tests",
      testDir: "./unit-tests",
      testMatch: "/**/*.test.ts",
      workers: 1,
      use: {
        browserName: "chromium",
        baseURL: undefined,
        headless: true,
      },
    },
    
    // 1) Setup project — logs in and saves authFile
    {
      name: "setup",
      testDir: "./helper",
      testMatch: ["global.auth.setup.spec.ts"],
      use: {
        ...commonUse,
        ...devices["Desktop Chrome"],
      },
    },

    // 2) Authenticated tests — reuse saved storage state
    {
      name: "authenticated",
      testDir: "./e2e",
      testMatch: "/auth/**/*.spec.ts",
      testIgnore: ['./unit-tests/**', './helper/globalSetup.ts'],
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
      testDir: "./e2e",
      testMatch: "/unauth/**/*.spec.ts",
      testIgnore: ['./unit-tests/**', './helper/globalSetup.ts'],
      use: {
        ...commonUse,
        ...devices["Desktop Chrome"],
      },
    },
    // 4) API tests
    {
      name: "api-tests",
      // Explicitly set the test directory for the API project
      testDir: "./e2e/api",
      testMatch: "*.spec.ts",
      use: {
        // We still need commonUse for the baseURL override, but we don't need UI-specific commonUse fields like geolocation.
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
  ],
});