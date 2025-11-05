import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const SETUP_FILE_PATH = path.resolve(__dirname, '..', 'helper', 'global.auth.setup.spec.ts');
const EXPECTED_STORAGE_PATH = '.auth/user.json';
const EXPECTED_ENV_VAR_USAGE = /process\.env\.(user_standard|password)/;

describe('🛡️ Global Auth Setup Integrity Check (helper/global.auth.setup.spec.ts)', () => {

    let fileContent: string;

    // Read the file content once for all tests
    it('should successfully read the content of the setup file', () => {
        expect(fs.existsSync(SETUP_FILE_PATH)).toBe(true);
        fileContent = fs.readFileSync(SETUP_FILE_PATH, 'utf-8');
        expect(fileContent.length).toBeGreaterThan(0);
    });

    // Test 1: Critical Output Path Check
    it(`should explicitly save the storage state to the expected path: ${EXPECTED_STORAGE_PATH}`, () => {
        // This is the absolute most critical check, as the playwright.config.ts depends on this exact path.
        const pathReference = `path: '${EXPECTED_STORAGE_PATH}'`;
        expect(fileContent).toContain(pathReference);

        if (!fileContent.includes(pathReference)) {
            console.error(`\n[ERROR] The storageState path is incorrect. Expected: "${pathReference}"`);
        }
    });

    // Test 2: Enforce Non-Hardcoded Credentials
    it('should use environment variables (process.env) for login credentials', () => {
        const usesEnvVars = EXPECTED_ENV_VAR_USAGE.test(fileContent);
        expect(usesEnvVars).toBe(true);
        
        if (!usesEnvVars) {
            console.error('\n[ERROR] Login credentials appear to be hardcoded. Please use "process.env" variables.');
        }
    });

    // Test 3: Enforce Playwright's `test` usage
    it('should ensure the file imports and uses the base "test" object from Playwright', () => {
        // Check for the standard import line
        expect(fileContent).toContain('import { test } from "@playwright/test";');

        // Check for the main test declaration structure
        expect(fileContent).toContain('test("create auth storage", async ({ page }) => {');
    });

    // Reminder Note (as documentation in test form)
    it('should remind the user about the highest protection level for this file', () => {
        const reminder = 'This file is core to authenticated testing speed. Do not modify the login steps or storage path unless changing the authentication mechanism itself.';
        expect(reminder).toBeDefined();
    });
});