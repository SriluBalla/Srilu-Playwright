import { expect, type Locator, type Page } from "@playwright/test";

export class getImage {

    readonly page: Page;

    constructor(page: Page) {
        
        this.page = page;
        
    }

    async wholePage(fileName: string){
        await this.page.screenshot({path: 'test-results/' + fileName + '.png', fullPage: true});

    }

    async element(locator: string, fileName: string){
        await this.page.locator(locator).screenshot({ path:  'test-results/' + fileName + '.png'});

    }
}
