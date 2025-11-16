// pages/Shop
import { expect, type Locator, type Page} from "@playwright/test";

export class PageShop {
  readonly page: Page;
  readonly hProducts: Locator;
  readonly btnMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hProducts = page.getByTestId("product-sort-container");
    this.btnMenu = page.locator('#menu_button_container')
  }

  product(name: string): Locator {
    return this.page
      .getByTestId("inventory-item-name")
      .filter({ hasText: name });
  }

}
