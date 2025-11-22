// pages/Shop
import { expect, type Locator, type Page} from "@playwright/test";

export class PageShop {
  readonly page: Page;
  readonly hProducts: Locator;
  readonly btnMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hProducts = page.locator('[data-test="product-sort-container"]');
    this.btnMenu = page.locator('#react-burger-menu-btn')
  }

  product(name: string): Locator {
    return this.page.locator('[data-test="inventory-item-name"]')
      .filter({ hasText: name });
  }

}
