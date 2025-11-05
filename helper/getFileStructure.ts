import fs from 'fs';
import path from 'path';

// --- Configuration ---
// These filters MUST match the logic used in your logging script
const IGNORE_DIRS = [
    'node_modules', 
    '.git', 
    '.husky', 
    'test-results', 
    'scripts', // IMPORTANT: Keep 'scripts' here to ignore the folder containing the log generator utility itself.
    'output',             
    'results',            
    'playwright-report',  
    '__pycache__'         
]; 

const IGNORE_FILES = [
    'log.html',             
    'output.xml',           
    'playwright-log.txt',   
    'report.html',          
    'package-lock.json',    
];

const IGNORE_REGEX = /^stage_\d{8}_\d{6}$/;
const MAX_DEPTH = 3;

/**
 * Recursively scans the directory and returns an array of relative paths 
 * for files and folders (up to MAX_DEPTH), excluding ignored items.
 * @param {string} currentPath - The full path of the directory to scan.
 * @param {string} rootPath - The project root path for generating relative paths.
 * @param {number} depth - Current recursion depth.
 * @returns {string[]} Sorted array of relative paths.
 */
export function getFileStructure(currentPath: string, rootPath: string, depth: number = 0): string[] {
    if (depth > MAX_DEPTH) {
        return [];
    }

    if (!fs.existsSync(currentPath)) {
        return [];
    }
    
    let structure: string[] = [];

    const files = fs.readdirSync(currentPath).filter(file => 
        !file.startsWith('.') && 
        !IGNORE_DIRS.includes(file) &&
        !IGNORE_FILES.includes(file) &&
        !IGNORE_REGEX.test(file)
    );

    files.forEach(file => {
        const filePath = path.join(currentPath, file);
        if (!fs.existsSync(filePath)) return;
        
        const relativePath = path.relative(rootPath, filePath).replace(/\\/g, '/');
        const isDirectory = fs.statSync(filePath).isDirectory();

        // Add the current file/folder path
        structure.push(relativePath);

        if (isDirectory) {
            // Recursively add the children's paths
            const childStructure = getFileStructure(filePath, rootPath, depth + 1);
            structure = structure.concat(childStructure);
        }
    });

    // Sort to ensure consistent output for comparison
    return structure.sort();
}