import { expect, type Locator, type Page } from "@playwright/test";

export class SwagLoginPage {

    readonly page: Page;
    readonly logoSwag: Locator;
    readonly fUserName: Locator;
    readonly fPassword: Locator;
    readonly btnLogin: Locator;
    readonly errLogin: Locator;

        constructor(page: Page) {
        
            this.page = page;
            this.logoSwag = page.locator('.app_logo');
            this.fUserName = page.locator('#user-name');
            this.fPassword = page.locator('#password');
            this.btnLogin = page.locator('#login-button');
            this.errLogin = page.locator('h3');
        }

        async login(user: string, pass: string){
            await this.fUserName.fill(user);
            await this.fPassword.fill(pass);
            await this.btnLogin.click();
        }

        async wrongUser(errorTxt: string | RegExp){
            await expect(this.errLogin).toBeVisible();
            // await expect(this.errLogin).toHaveText(expected);
            const textError = await this.errLogin.textContent();
            textError === errorTxt;
            expect(textError).toBe(errorTxt);

            console.log('Message Actual = ' + textError);
            console.log('Message Expected = ' + errorTxt);
        }

}