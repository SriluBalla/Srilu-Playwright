// unit-tests/naming-convention.test.ts
import { describe, test, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Element prefixes go here. Add and modify here. 
const validPrefixes = [
  "btn", // Button
  "cap", // Caption / Title
  "cb", // Checkbox
  "ddl", // Dropdown List
  "err", // Error Message
  "f", // Text Field (or Form container)
  "h", // Heading
  "i", // Icon
  "img", // Image
  "lnk", // NEW: Link (Anchor tag for navigation)
  "logo", // Logo
  "m", // Menu
  "nav", // Navigation menu or link (e.g., wrapper for primary links)
  "nb", // Navbar / Navigation Bar
  "pgn", // Pagination
  "pbar", // NEW: Progress Bar (or Loader/Spinner)
  "rb", // Radio Button
  "sbar", // Snack Bar for messages
  "sec", // Section / Content Area
  "sm", // SubMenu
  "tab", // Tab - like a menu item
  "tbl", // NEW: Table (The main container for grid data)
  "txt", // Text Words (Read-only text element)
];

// 🎯 Excluded files
const excludedFiles = [
  "allPages.ts",
];

const prefixPattern = `^(${validPrefixes.join("|")})[A-Z]`;
const namingRegex = new RegExp(prefixPattern);

const projectRoot = path.resolve(__dirname, "..");
const pagesDir = path.join(projectRoot, "pages");

// 🎯 READ ALL PAGE FILES
const pageObjectFiles = fs
  .readdirSync(pagesDir)
  .filter((file) => file.endsWith(".ts"))
  .filter((file) => !excludedFiles.includes(file)); 
const getElementNames = (fileContent: string): string[] => {
  const propertyRegex =
    /(public|private|protected|readonly)\s+([\w$]+)\s*[:=]/g;
  const matches = [...fileContent.matchAll(propertyRegex)];

  return matches
    .map((match) => match[2])
    .filter((name) => !["constructor", "page"].includes(name));
};
// -------------------------------------------------------------------

describe("📝 Page Object Naming Convention", () => {
  if (pageObjectFiles.length === 0) {
    test.skip("No Page Object files found to test after exclusions.", () => {});
  }

  test.each(pageObjectFiles)(
    "should enforce prefixes for all elements in %s",
    (fileName) => {
      const filePath = path.join(pagesDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const elementNames = getElementNames(fileContent);

      const failures: string[] = [];
      elementNames.forEach((name) => {
        if (!namingRegex.test(name)) {
          failures.push(name);
        }
      });

      expect(
        failures.length,
        `\n\n--- Naming Convention Failures in ${fileName} ---\n` +
          `The following properties do not start with a required prefix (${validPrefixes.join(
            ", "
          )}):` +
          `\n${failures.map((f) => `  - ${f}`).join("\n")}\n`
      ).toBe(0);
    }
  );
});
