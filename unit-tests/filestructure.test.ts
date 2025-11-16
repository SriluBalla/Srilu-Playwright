//unit-tests/filestructure
import { describe, it, expect } from "vitest";
import { getFileStructure } from "../helper/getFileStructure";
import path from "path";

// IMPORTANT: We use path.resolve(process.cwd()) to ensure the root is the
// directory where the test is run from (the Srilu-Playwright folder).
const PROJECT_ROOT = path.resolve(process.cwd());

// --- CANONICAL PROJECT STRUCTURE ---
// When you Add, Remove, or Rename a file =>
const EXPECTED_STRUCTURE: string[] = [
  "README.md",
  "data",
  "data/products.json",
  "e2e",
  "e2e/api",
  "e2e/api/jsonplaceholder.spec.ts",
  "e2e/auth",
  "e2e/auth/product.spec.ts",
  "e2e/local",
  "e2e/unauth",
  "e2e/unauth/userRoles.spec.ts",
  "env",
  "functions",
  "functions/Browser.ts",
  "functions/Login.ts",
  "functions/Product.ts",
  "functions/Shop.ts",
  "functions/allFunctions.ts",
  "generate-structure-log.js",
  "helper",
  "helper/dbconnect.ts",
  "helper/fixtures.ts",
  "helper/getFileStructure.ts",
  "helper/getImage.ts",
  "helper/global.auth.setup.spec.ts",
  "helper/serverCheck.ts",
  "helper/networkDiscovery.ts",
  "helper/serverHealth.ts",
  "package.json",
  "pages",
  "pages/allPages.ts",
  "pages/Home.ts",
  "pages/Login.ts",
  "pages/Product.ts",
  "pages/Shop.ts",
  "playwright.config.ts",
  "tsconfig.json",
  "unit-tests",
  "unit-tests/e2e.test.ts",
  "unit-tests/filestructure.test.ts",
  "unit-tests/fixtures.test.ts",
  "unit-tests/globalauth.test.ts",
  "unit-tests/pageobjectname.test.ts",
  "unit-tests/playwrightconfig.test.ts",
  "vitest.config.ts",
  "vitest.setup.js",
].sort(); // Ensure the hardcoded list is sorted for a reliable comparison

describe("Project File Structure Integrity Check", () => {
  it("should match the canonical file structure exactly", () => {
    // 1. Get the actual file structure from the disk
    const actualStructure = getFileStructure(PROJECT_ROOT, PROJECT_ROOT);

    // 2. Perform comparison
    expect(actualStructure).toEqual(EXPECTED_STRUCTURE);

    // Detailed check for easier debugging (useful if the array comparison fails)
    const missingFiles = EXPECTED_STRUCTURE.filter(
      (f) => !actualStructure.includes(f)
    );
    const unexpectedFiles = actualStructure.filter(
      (f) => !EXPECTED_STRUCTURE.includes(f)
    );

    if (missingFiles.length > 0) {
      console.error(
        "ERROR: Files expected in the structure are missing from the disk:",
        missingFiles
      );
    }
    if (unexpectedFiles.length > 0) {
      console.error(
        "ERROR: Unexpected files found on disk (Update EXPECTED_STRUCTURE if intentional):",
        unexpectedFiles
      );
    }
  });
});
