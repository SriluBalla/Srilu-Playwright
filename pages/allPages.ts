import { type Page } from "@playwright/test";

import { SwagLoginPage } from '../pages/swagLogin';
import { SwagShopPage } from '../pages/swagShop';
import { getImage } from '../helper/getImage';

export class allPages {

    readonly page: Page;
    readonly img: getImage;
    readonly SwagLogin: SwagLoginPage;
    readonly SwagShop: SwagShopPage;

    constructor(page: Page) {
        this.page = page;
        this.img = new getImage(page);
        this.SwagLogin = new SwagLoginPage(page);
        this.SwagShop = new SwagShopPage(page);
    }
    


}
