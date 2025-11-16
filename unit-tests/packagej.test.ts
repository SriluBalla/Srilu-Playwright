// unit-tests/packagej.test.ts
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const PACKAGE_FILE_PATH = path.resolve(__dirname, '..', 'package.json');

describe('📜 package.json', () => {

    let packageData: any;

    it('Read and parse package.json', () => {
        expect(fs.existsSync(PACKAGE_FILE_PATH)).toBe(true);
        const fileContent = fs.readFileSync(PACKAGE_FILE_PATH, 'utf-8');
        packageData = JSON.parse(fileContent);
        expect(packageData.scripts).toBeDefined();
    });

    it('test:e2e - covers - authenticated and unauthenticated', () => {
        const expectedCommand = 'playwright test --project authenticated --project unauthenticated';
        expect(packageData.scripts['test:e2e']).toBe(expectedCommand);
    });

    it('test:auth - covers - authenticated project', () => {
        const expectedCommand = 'playwright test --project authenticated';
        expect(packageData.scripts['test:auth']).toBe(expectedCommand);
    });

    it('test:unauth - covers -  unauthenticated project', () => {
        const expectedCommand = 'playwright test --project unauthenticated';
        expect(packageData.scripts['test:unauth']).toBe(expectedCommand);
    });

    it('test:api - covers - api-tests project', () => {
        const expectedCommand = 'playwright test --project api-tests';
        expect(packageData.scripts['test:api']).toBe(expectedCommand);
    });

    it('test:unit - covers - unit tests / vitest', () => {
        const expectedCommand = 'vitest';
        expect(packageData.scripts['test:unit']).toBe(expectedCommand);
    });
    
    it('postinstall - covers -  Playwright dependencies', () => {
        const expectedCommand = 'playwright install --with-deps';
        expect(packageData.scripts['postinstall']).toBe(expectedCommand);
    });

    it('Playwright and Vitest are defined as dependencies', () => {
        const dependencies = {
            ...packageData.dependencies,
            ...packageData.devDependencies,
        };
        
        expect(dependencies['@playwright/test']).toBeDefined();
        expect(dependencies['vitest']).toBeDefined();
    });
});