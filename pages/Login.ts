// pages/Login
import { expect, type Locator, type Page } from "@playwright/test";

export class PageLogin {

    readonly page: Page;
    readonly logoSwag: Locator;
    readonly fUserName: Locator;
    readonly fPassword: Locator;
    readonly btnLogin: Locator;
    readonly errLoginMsg: Locator;

        constructor(page: Page) {
        
            this.page = page;
            this.logoSwag = page.locator('.app_logo');
            this.fUserName = page.locator('#user-name');
            this.fPassword = page.locator('#password');
            this.btnLogin = page.locator('#login-button');
            this.errLoginMsg = page.locator('h3');

        }

        

}