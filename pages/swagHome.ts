import { expect, type Locator, type Page } from "@playwright/test";

export class SwagHomePage {
  readonly page: Page;
  readonly iCart: Locator;  


  constructor(page: Page) {
    this.page = page;
    this.iCart = page.getByTestId(".shopping-cart-link");
    
  }

}
