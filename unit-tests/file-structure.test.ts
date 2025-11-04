// unit-tests/file-structure.test.ts

import { describe, test, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// --- The Critical Fix ---
// The test file is in 'unit-tests'. We only need one '..' to reach the root 'Srilu-Playwright'.
const projectRoot = path.resolve(__dirname, '..'); 

// --- Define Paths Relative to the Root ---

const expectedFolders = [
  'data',
  'e2e', 
  'env', 
  'helper',
  'pages', 
  'unit-', 
];

const expectedFiles = [
  'package.json',
  'package-lock.json',
  'playwright.config.ts',
  'README.md',
  'tsconfig.json' // Added based on your structure
];

describe('🧪 Automation Suite Folder Structure Integrity', () => {

  // --- Folder Existence Assertions ---
  test.each(expectedFolders)('Folder "%s" should exist', (folder) => {
    const folderPath = path.join(projectRoot, folder);
    
    // Check if the path exists AND is a directory
    expect(fs.existsSync(folderPath), `Folder "${folder}" not found at ${folderPath}`).toBe(true);
    expect(fs.lstatSync(folderPath).isDirectory(), `Path "${folder}" is not a directory`).toBe(true);
  });

  // --- File Existence Assertions ---
  test.each(expectedFiles)('File "%s" should exist in the project root', (file) => {
    const filePath = path.join(projectRoot, file);

    // Check if the path exists AND is a file
    expect(fs.existsSync(filePath), `File "${file}" not found at ${filePath}`).toBe(true);
    expect(fs.lstatSync(filePath).isFile(), `Path "${file}" is not a file`).toBe(true);
  });
  
  // --- Specific Nested File Check ---
  test('A specific file should exist inside the "data" folder', () => {
    const fileName = 'products.json';
    const folder = 'data';
    const filePath = path.join(projectRoot, folder, fileName);
    
    expect(fs.existsSync(filePath), `File "${fileName}" not found in the "${folder}" folder`).toBe(true);
    expect(fs.lstatSync(filePath).isFile(), `Path "${fileName}" is not a file`).toBe(true);
  });
});