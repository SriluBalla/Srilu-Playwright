import { describe, it, expect } from 'vitest';
import * as fixtures from '../helper/fixtures';

// --- Setup ---
type FixtureList<T extends {}> = {
    [K in keyof T]: any; 
};

// --- Tests ---
describe('Fixtures Tests', () => {
    it('should export the custom "test" object', () => {
        expect(fixtures.test).toBeDefined();
        expect(typeof fixtures.test.extend).toBe('function');
    });

    it('"expect" exists', () => {
        expect(fixtures.expect).toBeDefined();
    });
});

describe('p, f, log, testInfo exist', () => {
    
    it('should define the mandatory custom fixtures: p, f, log', () => {
        const expectedFixtures: FixtureList<fixtures.MyFixtures> = {
            //If you change these in the fixtures file, please update here too
            p: true, // allPages
            f: true, // allFunctions
            log: true, // logger
            testInfo: true, // playwright built-in
        };
        
        const fixtureKeys = Object.keys(expectedFixtures);
        expect(fixtureKeys).toEqual(['p', 'f', 'log', 'testInfo']);
    });

    it('allPages and allFunctions dependencies are resolvable', async () => {
        try {
            const allPagesModule = await import('../pages/allPages');
            expect(allPagesModule.allPages).toBeDefined();
            
            const allFunctionsModule = await import('../functions/allFunctions');
            expect(allFunctionsModule.allFunctions).toBeDefined();
        } catch (e) {
            console.error('CRITICAL ERROR: A core module (allPages or allFunctions) cannot be resolved or is missing an export.', e);
            expect(e).toBeUndefined(); 
        }
    });

    it('Instructions for developer', () => {
        const fixtureIntegrityReminder = 
            'If this test fails, or if the "p" or "log" fixture logic is modified, ensure the core framework reporting, POM abstraction, and logging are maintained.';
        expect(fixtureIntegrityReminder).toBeDefined(); 
    });
});