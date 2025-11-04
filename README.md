# Srilu Balla -Playwright
Playwright with Typescript
https://www.youtube.com/watch?v=5WOi-qBoxmo 

______________________________________________
# Page Object Naming 

        GIVEN I name the page elements based on their type initially
        WHEN I type the first initial
        THEN All matching elements will populate, making it easy for anyone on the team to choose an element 
        AND if no results appear, the member will know to add them.
        
        WHEN I add every page and helper to allPages.ts
        THEN I can reduce the number of lines to call the pages and helpers.

Element  | Element Name
-------- | -------------
Button  | btnName
Caption | capName
Checkbox | cbName
Drop Down List | ddlName
Error | errName
Field | fName
Heading | hName
Image | ImgName
Logo | logoName
Menu | mName
Navigation Bar | nbName
Page | pName
Radio Button | rbName
Section | secName
Tab | tabName
Text | txtName

**p.Login.fUserName** is easy to understand

______________________________________________
# Git Stuff

    git status
    git add .
    git commit -a -m "message"
    git push origin main
    
    git checkout -b "name"    
    git checkout develop
    git fetch
    git pull
    git merge develop

______________________________________________
# RUN TESTS from interface

If you are using VSCode, running tests and running specific tests can be done from the interface.

1. Click on the **Test Explorer** (beaker)
2. open the **e2e** ==> view of all the tests show
3. Hover over the test ==> buttons for running, debugging display
4. click on the button and run the specific test as you build them.

**NOTE: the "problem user" test fails, because I purposefully coded it to fail (it is looking for an error message, which never shows up)**

<img width="964" alt="testExplorer" src="https://github.com/SriluBalla/Srilu-Playwright/assets/106475342/8f820274-60b5-44c7-839d-0630fe0bc795">
______________________________________________

# RUN tests from terminal - 

Run Tests

    test:e2e
    test:auth
    test:unauth
    test:api
    test:unit
    test:all


    npx playwright test --project authenticated 
    npx playwright test --project unauthenticated
    npx playwright test --project api-tests
    npx playwright test e2e/auth/product.spec.ts --project authenticated
    npx playwright test --project unit-tests

--------------------------------------
# Installation Instructions

Download JAVA - https://www.oracle.com/java/technologies/downloads/

Select the version of JDK. Select – Linux / macOS / Windows, Download ARM64 DMG Installer (for Mac), 

Double-click on the download -->  The folder opens with the DMG

Double-click on the PKG -->  Installer starts, Follow the steps and install the package


Download VSCode https://code.visualstudio.com/

Install NodeJS:
   
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
    (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/sriluballa/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)";
   
   
    Brew update
    Brew doctor

Export to set     
   
    export HOMEBREW_PREFIX = "/opt/homebrew/":
    export HOMEBREW_PREFIX="/opt/homebrew/":
    export HOMEBREW_CELLAR="/opt/homebrew/Cellar";
    export HOMEBREW_REPOSITORY="/opt/homebrew/":  


Install node    
   
    brew install node
    npm install -g grunt-cli


Check version    
   
    npm -v --> version shows
    node -v --> version shows


Install Playwright

    npm init playwright@latest
        Select TypeScript
        Select folder (any)
        Select true for all browsers
    npx playwright test
    npx playwright --version


Install Environments

    npm install dotenv @playwright/test 


--------------------------
View Report

    npx playwright show-report 
            http://localhost:9323/ opens with a test report log


Update Playwright version

    npm install -D @playwright/test@latest

