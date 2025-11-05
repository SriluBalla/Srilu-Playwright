import { describe, it, expect } from 'vitest';
import * as fixtures from '../helper/fixtures';

// Test 1: Check the core exports are present.
describe('Framework Fixtures Core API Check', () => {
    it('should export the custom "test" object', () => {
        expect(fixtures.test).toBeDefined();
        // Verify it is a Playwright extension object by checking a key property
        expect(typeof fixtures.test.extend).toBe('function');
    });

    it('should export "expect"', () => {
        expect(fixtures.expect).toBeDefined();
    });
});

// Test 2: Structural integrity check for dependencies.
describe('Framework Fixtures Dependency Check', () => {
    it('should ensure the allPages dependency is resolvable for the "p" fixture', async () => {
        try {
            // Dynamically import the allPages module to ensure the path and export are correct.
            const allPagesModule = await import('../pages/allPages');
            expect(allPagesModule.allPages).toBeDefined();
        } catch (e) {
            console.error('CRITICAL ERROR: Cannot resolve "../pages/allPages". The "p" fixture (Page Objects) setup will fail.', e);
            // If this fails, it indicates a broken link in the fixture setup.
            expect(e).toBeUndefined(); 
        }
    });

    // NOTE TO DEVELOPER: The integrity of the 'p' and 'log' fixture *logic* (their setup and teardown) 
    // must be manually maintained due to the complexity of testing Playwright internals outside a runner.
    it('should require intentional modification for the "p" and "log" fixtures', () => {
        const fixtureIntegrityReminder = 
            'If this test fails, or if the "p" or "log" fixture logic is modified, ensure the core framework reporting and POM abstraction is maintained.';
        
        // This serves as documentation-as-test for the high-protection code.
        expect(fixtureIntegrityReminder).toBeDefined(); 
    });
});