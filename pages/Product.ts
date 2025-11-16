// pages/Product
import { expect, type Locator, type Page } from "@playwright/test";

export class PageProduct {
  readonly page: Page;
  readonly btnBackToProducts: Locator;
  readonly txtProdTitle: Locator;
  readonly txtProdPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnBackToProducts = page.locator("#back-to-products");
    this.txtProdTitle = page.locator('[data-test="inventory-item-name"]');
    this.txtProdPrice = page.locator('[data-test="inventory-item-price"]');
  }

}
