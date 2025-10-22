// fixtures.ts (Simplified)

// 💡 Import 'test as base', 'expect', and the core types from Playwright
import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { allPages } from '../pages/allPages'; 

// Declare the types for your extended fixtures
type MyFixtures = {
    p: allPages; 
    testInfo: TestInfo;
};

// Extend the base test object.
export const test = base.extend<MyFixtures>({ // Renamed back to 'test' for simplicity
    p: [async ({ page, testInfo }, use) => {
        const pages = new allPages(page, testInfo);
        await use(pages);
    }, { scope: 'test' }],
    
    testInfo: [async ({}, use, testInfo) => {
        await use(testInfo);
    }, { scope: 'test', auto: true }]
});

// 💡 Only export the custom test object and expect.
export { expect };