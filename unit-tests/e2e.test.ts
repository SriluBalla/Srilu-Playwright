import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { getFileStructure } from '../helper/getFileStructure';

const PROJECT_ROOT = path.resolve(process.cwd());
const E2E_DIR = path.join(PROJECT_ROOT, 'e2e');

// 🎯 EXCEPTION: This file is intentionally allowed to use .only or .skip for local debugging/experimentation.
const EXCEPTION_FILE = 'e2e/unauth/experiment.spec.ts';

// Regex to find common Playwright focus/skip directives
const FORBIDDEN_PATTERNS = [
    /\.only\s*\(/g,      // e.g., test.only( or describe.only(
    /\.skip\s*\(/g,      // e.g., test.skip( or describe.skip(
    /\.fixme\s*\(/g,     // e.g., test.fixme(
    /\.fail\s*\(/g,      // e.g., test.fail(
];

describe('🛡️ E2E Test Policy Check (No .only or .skip)', () => {

    it('should confirm all E2E test files adhere to the commit policy', () => {
        
        // 1. Get all files within the e2e directory structure
        // We use getFileStructure and filter only the test files
        const allE2EFiles = getFileStructure(E2E_DIR, PROJECT_ROOT)
                               .filter(p => p.endsWith('.spec.ts')); 

        const forbiddenUsages: { file: string, match: string }[] = [];

        // 2. Iterate and check content
        for (const relativePath of allE2EFiles) {
            
            // Apply the exception for the experimental file
            if (relativePath === EXCEPTION_FILE) {
                continue;
            }

            const absolutePath = path.join(PROJECT_ROOT, relativePath);
            const content = fs.readFileSync(absolutePath, 'utf-8');

            for (const pattern of FORBIDDEN_PATTERNS) {
                // Find all matches for the pattern
                const matches = [...content.matchAll(pattern)];
                if (matches.length > 0) {
                    // Record the violation with the first match found
                    forbiddenUsages.push({ file: relativePath, match: matches[0][0].trim() });
                }
            }
        }

        // 3. Assertion and Detailed Error Logging
        if (forbiddenUsages.length > 0) {
            console.error('\n[POLICY VIOLATION] The following files contain forbidden Playwright directives (.only, .skip, etc.):');
            
            const errorReport = forbiddenUsages.map(item => 
                `- 📄 ${item.file} contains: ${item.match}`
            ).join('\n');
            
            console.error(errorReport);
            console.error(`\nNOTE: The file '${EXCEPTION_FILE}' is excluded from this check.`);
        }
        
        expect(forbiddenUsages.length).toBe(0);
    });
});