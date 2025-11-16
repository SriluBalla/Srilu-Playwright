// pages/Home where all the common elements live
import { expect, type Locator, type Page } from "@playwright/test";

export class PageHome {
  readonly page: Page;
  readonly CartIcon: Locator;  


  constructor(page: Page) {
    this.page = page;
    
    this.CartIcon = page.locator(".shopping-cart-link");
    
  }
}
