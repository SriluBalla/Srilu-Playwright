//unit-tests/filestructure
import { describe, it, expect } from "vitest";
import { getFileStructure } from "../helper/getFileStructure";
import path from "path";

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
  "functions/fLogin.ts",
  "functions/fProduct.ts",
  "functions/fShop.ts",
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
  "pages/pHome.ts",
  "pages/pLogin.ts",
  "pages/pProduct.ts",
  "pages/pShop.ts",
  "playwright.config.ts",
  "tsconfig.json",
  "unit-tests",
  "unit-tests/e2e.test.ts",
  "unit-tests/filestructure.test.ts",
  "unit-tests/fixtures.test.ts",
  "unit-tests/globalauth.test.ts",
  "unit-tests/packagej.test.ts",
  "unit-tests/pageobjectname.test.ts",
  "unit-tests/playwrightconfig.test.ts",
  "vitest.config.ts",
  "vitest.setup.js",
].sort();

describe("Project File Structure", () => {
  it("Matches the canonical file structure", () => {
    const actualStructure = getFileStructure(PROJECT_ROOT, PROJECT_ROOT);
    expect(actualStructure).toEqual(EXPECTED_STRUCTURE);
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
