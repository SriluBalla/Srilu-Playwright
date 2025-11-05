// scripts/generate-structure-log.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // New import for resolving file paths

// ESM compatibility: Manually define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
// path.resolve(__dirname) now sets the project root to the directory 
// containing this script (Srilu-Playwright), preventing the log from showing the parent folder.
const projectRoot = path.resolve(__dirname);

// Directories to ignore if they are direct children of the current traversal path
const IGNORE_DIRS = [
    'node_modules', 
    '.git', 
    '.husky', 
    'test-results', 
    'scripts',
    'output',             // Ignore generated Robot Framework/Playwright output directory
    'results',            // Ignore common test results folders
    'playwright-report',  // Ignore the HTML report directory
    '__pycache__'         // Ignore Python cache directories
]; 

// Specific files to ignore, regardless of the directory they are in
const IGNORE_FILES = [
    'log.html',             // Ignore generated log files
    'output.xml',           // Ignore Robot Framework XML result files
    'playwright-log.txt',   // Ignore detailed playwright log text files
    'report.html',          // Ignore main HTML report files
    'package-lock.json',    // Ignore dependency lock files
];

// Regular expression to ignore dated log folders (e.g., stage_YYYYMMDD_HHMMSS)
const IGNORE_REGEX = /^stage_\d{8}_\d{6}$/;

const MAX_DEPTH = 3;

/**
 * Recursively logs the directory structure.
 * @param {string} currentPath
 * @param {string} prefix
 * @param {number} depth
 */
function logStructure(currentPath, prefix = '', depth = 0) {
    if (depth > MAX_DEPTH) {
        return;
    }

    // Ensure directory exists before reading
    if (!fs.existsSync(currentPath)) return;
    
    // Read files and filter out:
    // 1. Hidden files/dirs (starting with '.')
    // 2. Specific directory names in IGNORE_DIRS
    // 3. Specific file names in IGNORE_FILES (New)
    // 4. Files/dirs matching IGNORE_REGEX (e.g., dated log folders)
    const files = fs.readdirSync(currentPath).filter(file => 
        !file.startsWith('.') && 
        !IGNORE_DIRS.includes(file) &&
        !IGNORE_FILES.includes(file) && // Filter out specific files
        !IGNORE_REGEX.test(file)
    );

    files.forEach((file, index) => {
        const filePath = path.join(currentPath, file);
        
        // This check is required inside the loop because the filter above excludes directories
        // but we need to ensure we don't try to stat a deleted file if multiple processes are running.
        if (!fs.existsSync(filePath)) return;
        
        const isDirectory = fs.statSync(filePath).isDirectory();

        const isLast = index === files.length - 1;
        const pointer = isDirectory ? '📁 ' : '📄 ';
        const line = isLast ? '└── ' : '├── ';

        // Only log the project root folder name once, then start the content
        if (depth > 0) {
            console.log(`${prefix}${line}${pointer}${file}`);
        } else {
             // For the root level (depth 0), just start with the file/folder name
             // We print the contents directly instead of the folder itself, as the folder name is in the header
            console.log(`${line}${pointer}${file}`);
        }
        
        if (isDirectory) {
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            logStructure(filePath, nextPrefix, depth + 1);
        }
    });
}

console.log(`\n--- Project Structure Log (Root: ${path.basename(projectRoot)}, Max Depth ${MAX_DEPTH}) ---`);
logStructure(projectRoot);
console.log('-----------------------------------------------------\n');