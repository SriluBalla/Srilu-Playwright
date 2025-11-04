// vitest.config.ts

/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // 1. Target Unit Tests: 
    //    Ensure Vitest only looks inside the 'unit-tests' folder for files ending in .test.ts
    include: ['unit-tests/**/*.test.ts'], 
    
    // 2. 🎯 CRITICAL FIX: Explicitly exclude the Playwright E2E folder and the config file.
    exclude: [
      '**/node_modules/**', 
      '**/e2e/**', // <--- This completely ignores all files in your 'e2e' folder
      'playwright.config.*',
      'README.md'
    ],
    
    environment: 'node', 
    // Other unit test configurations here...
  },
});