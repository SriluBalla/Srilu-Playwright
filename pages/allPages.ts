import { type Page } from "@playwright/test";

import { SwagLogin } from '../pages/swagLogin';
import { SwagShop } from '../pages/swagShop';
import { getImage } from '../helper/getImage';
import { data } from '../helper/env_data';

export class allPages {

    readonly page: Page;

    constructor(page: Page) {
        
        this.page = page;
        
    }


}
