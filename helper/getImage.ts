import { expect, type Locator, type Page } from "@playwright/test";
import { data } from '../helper/env_data';

export class getImage {

    readonly page: Page;

    constructor(page: Page) {
        
        this.page = page;
        
    }

    async wholePage(fileName: string){
        await this.page.screenshot({path: data.pathScreenshot + fileName + '.png', fullPage: true});

    }

    async element(locator: string, fileName: string){
        await this.page.locator(locator).screenshot({ path:  data.pathScreenshot + fileName + '.png'});

    }
}
