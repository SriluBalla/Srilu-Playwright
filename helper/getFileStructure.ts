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

        structure.push(relativePath);

        if (isDirectory) {
            const childStructure = getFileStructure(filePath, rootPath, depth + 1);
            structure = structure.concat(childStructure);
        }
    });

    return structure.sort();
}