// pages/Home where all the common elements live
import { expect, type Locator, type Page } from "@playwright/test";

export class PageHome {
  readonly page: Page;
  readonly iconCart: Locator;  


  constructor(page: Page) {
    this.page = page;
    
    this.iconCart = page.locator(".shopping-cart-link");
    
  }
}
