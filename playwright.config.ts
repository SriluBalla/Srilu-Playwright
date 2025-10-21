// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv'; // <— works reliably with Playwright's TS loader

const ENV = process.env.ENV || 'qa';
dotenv.config({ path: `./env/.env.${ENV}` });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  // workers: isCI ? 1 : undefined,
    workers: 1,

  reporter: 'html',
  use: {
    baseURL: process.env.URL,
    headless: isCI ? true : false,
    slowMo: isCI ? 0 : 200,
    trace: 'on-first-retry',
    colorScheme: 'dark',
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ['geolocation'],
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
