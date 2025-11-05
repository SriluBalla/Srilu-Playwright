# 🛡️ Srilu-Playwright E2E

Welcome to the Srilu-Playwright automation repository that handles
*  Authenticated scenarios with (browser context) 
*  Unauthenticated scenarios 
* Ping checks to ensure system health
*  API testing - Dedicated API testing
*  Vitest with unit tests on the framework's core files.

### ⚙️ Prerequisites & Setup

1.  Node.js: Ensure you have Node.js (v18+) installed.
2. Dependencies: Install all project dependencies.

        npm install

3. Environment Variables: Create an env/.env.[ENV] file (e.g., env/.env.qa) based on the environment you are targeting. This file must define URL, user_standard, and password.
4. Authentication Setup (Mandatory First Run). This creates the .auth/user.json file

        npx playwright test --project=setup

## 🚀 Running End-to-End (E2E) Tests

    npm run test:e2e
    npm run test:auth
    npm run test:unauth
    npm run test:api
    npm run test:unit
OR

    npx playwright test --project authenticated 
    npx playwright test --project unauthenticated
    npx playwright test --project api-tests
    npx playwright test e2e/auth/product.spec.ts --project authenticated
______________________________________________
### 💎 Page Object Naming Protocol (Crucial for IntelliSense)
We use a standard naming prefix for all Page Object Model (POM) elements. This ensures IntelliSense guides users immediately to the correct element type, making test writing fast and reliable.

Element  | Naming Prefix | Element Name
-------- | ------------- | -------------
Button  | btn | p.Login.btnSubmit
Caption | cap | p.Home.capWelcome
Checkbox | cb | p.Settings.cbRememberMe
Drop Down List | ddl | p.Shop.ddlSortBy
Error | err | p.Login.errInvalidCredentials
Field | f | p.Login.fUserName 
Heading | h | p.Home.hMainTitle
Image | img | p.Home.imgHero
Logo | logo | p.Header.logoSite
Menu | m | p.Header.mUser
Navigation Bar | nb | p.Header.nbMainMenu
Radio Button | r | p.Settings.rbOptionOne
Section | sec | p.Shop.secProductList
Tab | tab | p.Profile.tabOrders
Text | txt | p.Product.txtName



        GIVEN I name the page elements based on the element type
        WHEN I type the first initial
        THEN IntelliSense populates matching elements, making it easy for the user to choose an element 
        AND if no results appear, the member will know to add them.
        
        WHEN I add every page and helper to allPages.ts
        THEN I can reduce the number of lines to call the pages and helpers.
______________________________________________

### Protocols to follow 
* Get familiar with tests in unit-tests
* all-pages = ensures all the page object files are accounted for in the allPages.ts with some exceptions
* e2e = ensures none of the test files have unintended code
* filestructure = files added, renamed, deleted should be updated in the order they show up on the file structure
* fixtures = ensures fixtures file is not disturbed at all
* globalauth = ensures global.auth.setup has not been disturbed with the exception to IDs and variable values
* page-object-naming = read the file to understand the page object naming convention. Follow it to the T. add more element types if need arises
* playwright = the config file needs to be not touched with exepction to some variables like env changes and such.
_____________________________________________

### Git Stuff
In case you hate memorizing the git commands. Here you go

    git status
    git add .
    git commit -a -m "message"
    git push origin main
    
    git checkout -b "name"    
    git checkout develop
    git fetch
    git pull
    git merge develop

