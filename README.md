# Srilu-Playwright
Playwright with Typescript

# RUN TESTS from interface

If you are using VSCode, running tests and running specific tests can be done from the interface.

1. Click on the **Test Explorer** (beaker)
2. open the **e2e** ==> view of all the tests show
3. Hover over the test ==> buttons for running, debugging display
4. click on the button and run the specific test as you build them.

**NOTE: the problem user test fails, because I purposefully coded it to fail (it is looking for an error message, which never shows up)**

______________________________________________

# RUN tests from terminal - 

Run all the tests

    npx playwright test

Run test to view the steps (helpful when building tests)

    npx playwright test -ui

Run single test

    npx playwright test tests/fileName

Run a set of test files

    npx playwright test tests/file1 tests/file2

Run tests based on file name
    
    npx playwright test file1 file2

Run test on a certain line of a file
    
    npx playwright test file.ts:12

Run test by title
    
    npx playwright test -g "test title"

Run test by headed browser 

-- chromium (default) firefox webkit 'Mobile Chrome' 'Mobile Safari' 'Microsoft Edge' 'Google Chrome'
    
    npx playwright test --headed

    npx playwright test --project firefox

    npx playwright test --project 'Mobile Safari'

Run debug mode with inspector

    npx playwright test --debug

Choose Reporter

    npx playwright test --reporter=dot

Help

    npx playwright test --help

Record steps (lease recomended)

    npx playwright codegen   


--------------------------------------
Installation Instructions

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

