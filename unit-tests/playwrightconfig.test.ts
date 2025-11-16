import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// --- Setup ---

const CONFIG_FILE_PATH = path.resolve(__dirname, '..', 'playwright.config.ts');

describe('🛡️ Playwright Config', () => {

    let configContent: string;

    it('Read the content of the config file', () => {
        expect(fs.existsSync(CONFIG_FILE_PATH)).toBe(true);
        configContent = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
        expect(configContent.length).toBeGreaterThan(0);
    });
    
    it('Enforce the use of ENV variables for baseURL and dynamic environment loading', () => {
        expect(configContent).toContain('baseURL: process.env.URL');
        expect(configContent).toContain('const ENV = process.env.ENV || "qa";');
        expect(configContent).toContain("dotenv.config({ path: join(__dirname, `env/.env.${ENV}`) });");
    });
    
    it('Enforce CI-ready flags for performance and focus control', () => {
        expect(configContent).toContain('fullyParallel: true,');
        expect(configContent).toContain('forbidOnly: isCI,');
        expect(configContent).toContain('retries: isCI ? 2 : 0,');
    });

    it('Define the auth directory and file path', () => {
        expect(configContent).toContain('const authDir = join(__dirname, ".auth");');
        expect(configContent).toContain('const authFile = join(authDir, "user.json");');
    });

    it('Define the "setup" project pointing to global.auth.setup.spec.ts', () => {
        const setupProject = configContent.match(/name:\s*"setup"[^}]*testMatch:\s*\["global\.auth\.setup\.spec\.ts"\]/s);
        expect(setupProject).not.toBeNull();
    });
    
    it('Define the "authenticated" project with mandatory storageState and setup dependency', () => {
        const authenticatedProject = configContent.match(
            /name:\s*"authenticated"[^}]*dependencies:\s*\["setup"\][^}]*storageState:\s*authFile/s
        );
        expect(authenticatedProject).not.toBeNull();
    });

    it('Unauthenticated" project for exists', () => {
        expect(configContent).toContain('name: "unauthenticated",');
    });
    
    it('Api-tests project with a wellformed baseURL', () => {
        const apiProject = configContent.match(
            /name:\s*"api-tests"[^}]*baseURL:\s*"https:\/\/jsonplaceholder\.typicode\.com"/s
        );
        expect(apiProject).not.toBeNull();
    });
    
    it('Unit-tests project is pointing to the correct directory', () => {
        expect(configContent).toContain('testDir: "./unit-tests",');
    });

    it('All projects require authentication use the stored state', () => {
        const authProjectCheck = configContent.match(/name:\s*"authenticated"[^}]*use:\s*{[^}]*storageState:\s*authFile/s);
        expect(authProjectCheck).not.toBeNull();
    });
});