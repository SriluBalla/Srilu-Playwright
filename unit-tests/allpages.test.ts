// unit-tests/all-pages.test.ts
import { describe, test, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const projectRoot = path.resolve(__dirname, '..');
const pagesDir = path.join(projectRoot, 'pages');
const allPagesFilePath = path.join(pagesDir, 'allPages.ts');

// 1. Files in 'pages' to be excluded from the required list (e.g., helpers, base classes)
const excludedPageFiles = [
    'allPages.ts', 
    'browser.ts', 
];

// 2. 🎯 List of names that ARE in allPages.ts but NOT in the 'pages' directory.
const requiredExternalHelpers = [
    'getImage', 
];

// --- Set UP ---
// Dynamically read all page files that should be included
const pageObjectFilesToInclude = fs
    .readdirSync(pagesDir)
    .filter(file => file.endsWith('.ts') && !excludedPageFiles.includes(file));

// Get the expected class names based on the filenames 
const expectedClassNames = pageObjectFilesToInclude
    .map(file => path.basename(file, '.ts')) 
    .map(name => name.charAt(0).toUpperCase() + name.slice(1) + 'Page'); 

const expectedModuleNames = expectedClassNames.concat(requiredExternalHelpers);

const allPagesContent = fs.readFileSync(allPagesFilePath, 'utf-8');

// --- Unit Tests ---
describe('🗂️ allPages.ts Completeness Check', () => {
    
    test('should ensure every page object file is imported in allPages.ts', () => {
        const missingImports: string[] = [];

        // Check if the import statement exists for every required file
        pageObjectFilesToInclude.forEach(file => {
            const fileNameWithoutExt = path.basename(file, '.ts');
            const importRegex = new RegExp(`from\\s+["'][^"']*${fileNameWithoutExt}["']`, 'i');
            
            if (!importRegex.test(allPagesContent)) {
                missingImports.push(file);
            }
        });

        expect(missingImports.length,
            `\n\n--- Missing Imports in allPages.ts ---\n` +
            `The following files exist in the 'pages' folder but are NOT imported in allPages.ts:` +
            `\n${missingImports.map(f => `  - ${f}`).join('\n')}\n`
        ).toBe(0);
    });

    test('should ensure every required module is present as a property/dependency', () => {
        const missingProperties: string[] = [];

        // Check if the class property and/or initialization exists for every expected module
        expectedModuleNames.forEach(moduleName => {
            const propertyRegex = new RegExp(`(readonly|this\\.)\\s*(\\w*):*\\s*${moduleName}`, 'i');
            
            if (!propertyRegex.test(allPagesContent)) {
                missingProperties.push(moduleName);
            }
        });

        expect(missingProperties.length,
            `\n\n--- Missing Properties/Initialization in allPages.ts ---\n` +
            `The following required modules (pages/helpers) are not declared or initialized:` +
            `\n${missingProperties.map(m => `  - ${m}`).join('\n')}\n`
        ).toBe(0);
    });
    
});