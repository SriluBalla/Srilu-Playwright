//playwright.config
import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as fs from "fs"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENV = process.env.ENV || "qa";
// Env file path
dotenv.config({ path: join(__dirname, `env/.env.${ENV}`) });

const isCI = !!process.env.CI;
const authDir = join(__dirname, ".auth");
const authFile = join(authDir, "user.json");

// .auth directory exists
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

const commonUse = {
  viewport: null,
  baseURL: process.env.URL,
  headless: isCI,
  slowMo: isCI ? 0 : 50, // Reduced slowMo 
  trace: "on-first-retry" as const,
  colorScheme: "dark" as const,
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ["geolocation"] as const,
};

export default defineConfig({

  globalSetup: join(__dirname, "./helper/serverCheck"), // Ping Test

  // Project root
  testDir: "./",
  
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
    // 0) Unit Tests Project - ('npm run test:unit')
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

    // 2) Authenticated tests — ('npm run test:auth')
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

    // 3) Unauthenticated tests - ('npm run test:unauth')
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
    // 4) API tests - ('npm run test:api')
    {
      name: "api-tests",
      // Set the test directory for the API project
      testDir: "./e2e/api",
      testMatch: "*.spec.ts",
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
     // 5) Locally run tests for experimenting before finalizing - ('npm run test:local')
    {
      name: "local",
      testDir: "./e2e",
      testMatch: "/local/**/*.spec.ts",
      testIgnore: ['./unit-tests/**', './helper/globalSetup.ts'],
      use: {
        ...commonUse,
        ...devices["Desktop Chrome"],
      },
    },
  ],
});