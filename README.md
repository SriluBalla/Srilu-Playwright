# 🛡️ Srilu-Playwright E2E

### 🧭 Automation Framework Setup & Contribution Guide
This guide is designed to help you **quickly set up, understand, and contribute** to the automation framework.

---

## 🚀 Getting Started
To get the project running and review existing tests:

1. **🧩 Prerequisites**

   Before installing dependencies, verify that **Node.js** and **npm** are correctly installed on your system:

2. **📦 Acquisition**  
   Download the repository as a **zipped file** *(do not clone via Git)*.

3. **⚙️ Installation**  
   Install dependencies and Playwright browsers: 

   ```
   npm install
   ```

4. ▶️ Initial Run
  
     Execute the full end-to-end suite:

        
        npm run test:e2e
        The current tests demonstrate interaction with public sites like Sauce Labs.
        

5. 🧾 Review Reports

    Examine the generated Playwright Report (playwright-report/) to understand flow and results.


## ⚙️ Core Configuration

Before writing new tests, replace placeholder settings with your application’s details.

| **Area**                     | **File / Path**                    | **Action Required**                                                     |
| :--------------------------- | :--------------------------------- | :---------------------------------------------------------------------- |
| 🌍 **Environment Variables** | `env/.env.{ENV}`                   | Update all application URLs, API endpoints, and credentials.            |
| 🔐 **Authentication Setup**  | `helper/global.auth.setup.spec.ts` | Modify URLs and locator IDs to match your login flow.                   |
| ❤️ **Health Check URLs**     | `helper/globalSetup.ts`            | Update base URLs and specific health check endpoints.                   |
| 🗄️ **Database Integration** | `helper/dbconnect.ts`              | Edit connection parameters and credentials if DB interaction is needed. |

## 🧱 Framework Principles (Fixtures & Structure)

Understanding these principles ensures efficient, consistent, and scalable test creation.

## 🗂️ Page Object Manager — pages/allPages.ts

Acts as the central hub for all Page Object Models (POMs).

Every new POM must be instantiated and exported here.

        // pages/allPages.ts
        import { LoginPage } from './Login.page';
        import { HomePage } from './Home.page';

        export const allPages = {
        Login: new LoginPage(),
        Home: new HomePage(),
        };

## 🔧 Fixtures — baseTest.ts - ⚠️ Do not modify this file.

      Automatically injects the allPages manager, eliminating redundant imports in spec files.
      Provides immediate access to all POMs and utility classes.

        // baseTest.ts
        import { test as base } from '@playwright/test';
        import { allPages } from '../pages/allPages';

        export const test = base.extend({
        p: async ({ page }, use) => {
        await use(allPages);
        },
        });

        export { expect } from '@playwright/test';

## 🧩 Locator Naming Convention

Strictly adhere to prefixes defined in LOCATOR_NAMING_CONVENTION.md
.
Ensures clarity, uniformity, and fast troubleshooting across POMs.

        // Example locator naming
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.fUsername = page.getByTestId('username');
        this.errInvalidLogin = page.getByText('Invalid credentials');

### ✅ Maintenance & Quality Control

To maintain long-term stability, readability, and quality, unit tests exist within /test.

| **Area**                       | **Purpose**                                            | **Example Path**                    |
| :----------------------------- | :----------------------------------------------------- | :---------------------------------- |
| 🧩 **POM Review**              | Enforces locator naming and structure                  | `/unit-test/pageobjectname.test.ts` |
| 📁 **File Structure Tracking** | Ensures required files are present and correctly named | `/unit-test/filestructure.test.ts`  |

## 🧼 Best Practices

 - ✅ Follow naming conventions consistently
 - ✅ Run unit tests before committing code
 - ✅ Keep POMs modular and readable
 - ✅ Avoid modifying shared fixtures
 - ✅ Review Playwright reports regularly

# ❓ What Does This Project Cover ?

* 🔐 Authenticated scenarios (browser context)
* 🪪 Unauthenticated scenarios
* 🩺 Ping / Health checks
* 🔗 API testing
* 🧪 Vitest unit tests for core files

## ⚙️ Prerequisites & Setup

1. 📦 Node.js — Ensure v18+ is installed.
2. 📚 Dependencies

        npm install

3. 🌍 Environment Variables — Create env/.env.[ENV] (e.g., env/.env.qa) with URL, user_standard, and password.
4. 🔐 Authentication Setup (first run)

        npx playwright test --project=setup

### 🚀 Running Tests

NPM scripts

        npm run test:e2e
        npm run test:auth
        npm run test:unauth
        npm run test:api
        npm run test:unit


Direct Playwright

        npx playwright test --project authenticated
        npx playwright test --project unauthenticated
        npx playwright test --project api-tests
        npx playwright test e2e/auth/product.spec.ts --project authenticated

###  💎 Page Object Naming Protocol (Crucial for IntelliSense)
🎯 Locator Naming Convention (Alphabetical)

| **Element Name** | **Prefix** | **Example**               | **Description**                   |
| :--------------- | :--------: | :------------------------ | :-------------------------------- |
| Button           |    `btn`   | `p.Login.btnSubmit`       | Triggers an action                |
| Caption          |    `cap`   | `p.Home.capWelcome`       | Descriptive text / subtitle       |
| Checkbox         |    `cb`    | `p.Settings.cbRememberMe` | Two-state toggle                  |
| Dropdown List    |    `ddl`   | `p.Shop.ddlSortBy`        | Select element or custom dropdown |
| Error            |    `err`   | `p.Login.errBadLogin1`    | Inline error message              |
| Field (Input)    |     `f`    | `p.Login.fUserName`       | Text input field                  |
| Heading          |     `h`    | `p.Home.hMainTitle`       | Structural heading                |
| Icon             |     `i`    | `p.Header.iCart`          | Small graphic (SVG, Font Awesome) |
| Image            |    `img`   | `p.Home.imgHero`          | Primary image                     |
| Link             |    `lnk`   | `p.Footer.lnkPrivacy`     | Anchor tag for navigation         |
| Logo             |   `logo`   | `p.Header.logoSite`       | Main logo image/link              |
| Menu             |     `m`    | `p.Header.mProfile`       | Menu container                    |
| Navigation       |    `nav`   | `p.Header.navPrimary`     | Navigation wrapper                |
| Navbar           |    `nb`    | `p.Header.nbHome`         | Top horizontal bar                |
| Pagination       |    `pgn`   | `p.Shop.pgnControls`      | Page number controls              |
| Progress Bar     |   `pbar`   | `p.Upload.pbarStatus`     | Loader / progress indicator       |
| Radio Button     |    `rb`    | `p.Settings.rbOptionOne`  | Single choice radio               |
| Snack Bar        |   `sbar`   | `p.App.sbarSuccess`       | Toast notification                |
| Section          |    `sec`   | `p.Shop.secProductList`   | Logical content area              |
| Submenu          |    `sm`    | `p.Header.smAccount`      | Nested menu                       |
| Tab              |    `tab`   | `p.Profile.tabOrders`     | View switch tab                   |
| Table            |    `tbl`   | `p.Admin.tblUsers`        | Structured data table             |
| Text             |    `txt`   | `p.Product.txtName`       | Static read-only text             |

        // Login.page.ts
        export class LoginPage {
        constructor(private page: import('@playwright/test').Page) {}
        fUserName = this.page.getByTestId('login-username');
        fPassword = this.page.getByTestId('login-password');
        btnSubmit = this.page.getByRole('button', { name: 'Sign In' });
        errBadLogin1 = this.page.getByText('Invalid username or password.');


### 📏 Protocols to Follow

* 🧩 unit-tests — review tests in unit-tests
* 🗂️ all-pages — verify all POM files are listed in allPages.ts
* 🧪 e2e — check for unintended code in spec files
* 🗃️ filestructure — reflect added/renamed/deleted files properly
* 🛡️ fixtures — ensure fixture files remain untouched
* 🔐 globalauth — only IDs/variables may change in global.auth.setup
* 🏷️ page-object-naming — follow prefix rules to the T
* ⚙️ playwright — edit config only for env variables

# 🌿 Git Quick Reference

        tree -L5 -I 'node_modules|dist|build|.git'

        git status
        git add .
        git commit -a -m "message"
        git push origin main

        git checkout -b "feature/name"
        git checkout develop
        git fetch
        git pull
        git merge develop



                --------- THE END ---------