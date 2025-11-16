import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";

export class getImage {

    readonly page: Page;
    readonly testInfo: TestInfo; 

    constructor(page: Page, testInfo: TestInfo) { 
        this.page = page;
        this.testInfo = testInfo; 
    }

    async wholePage(fileName: string){
        const screenshotPath = `test-results/${fileName}.png`;
        
        await this.page.screenshot({path: screenshotPath, fullPage: true});
        await this.testInfo.attach(fileName + ' (Full Page)', {
            path: screenshotPath,
            contentType: 'image/png',
        });
    }

    async element(locator: string, fileName: string){
        const screenshotPath = `test-results/${fileName}.png`;

        await this.page.locator(locator).screenshot({ path: screenshotPath });
        await this.testInfo.attach(fileName + ' (Element)', {
            path: screenshotPath,
            contentType: 'image/png',
        });
    }
}