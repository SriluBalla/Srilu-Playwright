import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Resolve the path to the configuration file
const CONFIG_FILE_PATH = path.resolve(__dirname, '..', 'playwright.config.ts');

describe('🛡️ Playwright Config Integrity Check (playwright.config.ts)', () => {

    let configContent: string;

    // Read the file content once for all tests
    it('should successfully read the content of the config file', () => {
        expect(fs.existsSync(CONFIG_FILE_PATH)).toBe(true);
        configContent = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
        expect(configContent.length).toBeGreaterThan(0);
    });

    // --- Global Configuration Checks (Protected Settings) ---

    it('should enforce the use of process.env.URL for baseURL', () => {
        // Find the 'baseURL' property within the 'commonUse' or 'use' object
        const baseURLCheck = configContent.match(/baseURL:\s*process\.env\.URL/);
        expect(baseURLCheck).not.toBeNull();

        if (!baseURLCheck) {
            console.error('\n[ERROR] `baseURL` must be set using `process.env.URL` and should not be hardcoded.');
        }
    });

    it('should enforce `fullyParallel: true` for performance', () => {
        expect(configContent).toContain('fullyParallel: true');
    });

    it('should enforce `forbidOnly: isCI` to prevent accidental commits of focused tests', () => {
        expect(configContent).toContain('forbidOnly: isCI');
    });

    it('should use `process.env.ENV` for dynamic environment loading', () => {
        expect(configContent).toContain('const ENV = process.env.ENV || "qa";');
        expect(configContent).toContain("dotenv.config({ path: join(__dirname, `env/.env.${ENV}`) });");
    });

    // --- Project Structure Checks (Mandatory Test Types) ---

    it('should define the "setup" project pointing to global.auth.setup.spec.ts', () => {
        const setupProject = configContent.match(/name:\s*"setup"[^}]*testMatch:\s*\["global\.auth\.setup\.spec\.ts"\]/s);
        expect(setupProject).not.toBeNull();
    });
    
    it('should define the "authenticated" project with storageState dependency', () => {
        const authenticatedProject = configContent.match(/name:\s*"authenticated"[^}]*dependencies:\s*\["setup"\][^}]*storageState:\s*authFile/s);
        expect(authenticatedProject).not.toBeNull();
        
        if (!authenticatedProject) {
            console.error('\n[ERROR] "authenticated" project is missing mandatory properties: dependencies: ["setup"] and storageState: authFile.');
        }
    });

    it('should define the "api-tests" project with correct baseURL', () => {
        const apiProject = configContent.match(/name:\s*"api-tests"[^}]*baseURL:\s*"https:\/\/jsonplaceholder\.typicode\.com"/s);
        expect(apiProject).not.toBeNull();
    });
    
    it('should define the "unit-tests" project and point to the correct directory', () => {
        const unitTestProject = configContent.match(/name:\s*"unit-tests"[^}]*testDir:\s*".\/unit-tests"/s);
        expect(unitTestProject).not.toBeNull();
    });

    // Reminder Note (as documentation in test form)
    it('should remind the user about required intentional modifications', () => {
        const reminder = 'Sections like `workers` and adding new `projects` are flexible, but core performance/security settings (fullyParallel, forbidOnly, baseURL) must be maintained.';
        expect(reminder).toBeDefined();
    });
});