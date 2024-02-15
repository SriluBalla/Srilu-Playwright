import { expect, type Locator, type Page } from "@playwright/test";

export class SwagShopPage {

    readonly page: Page;
    readonly cart: Locator;
    

        constructor(page: Page) {
        
            this.page = page;
            this.cart = page.locator('.shopping_cart_link');
        }


        async login(user: string, pass: string){
           
        }

    
}