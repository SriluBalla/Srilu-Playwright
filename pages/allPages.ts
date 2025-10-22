// All Pages Data Functions
import { type Page, type TestInfo } from "@playwright/test"; // <-- Import TestInfo

import { SwagLoginPage } from '../pages/swagLogin';
import { SwagShopPage } from '../pages/swagShop';
import { getImage } from '../helper/getImage';

export class allPages {

    readonly page: Page;
    readonly testInfo: TestInfo; // <-- New property for TestInfo
    readonly img: getImage;
    readonly SwagLogin: SwagLoginPage;
    readonly SwagShop: SwagShopPage;

    // The constructor now accepts TestInfo
    constructor(page: Page, testInfo: TestInfo) { 
        this.page = page;
        this.testInfo = testInfo; 
        this.img = new getImage(page, testInfo); 
        this.SwagLogin = new SwagLoginPage(page);
        this.SwagShop = new SwagShopPage(page);
    }
}