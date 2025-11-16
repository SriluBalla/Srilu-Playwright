// pages/Product
import { expect, type Locator, type Page } from "@playwright/test";

export class PageProduct {
  readonly page: Page;
  readonly btnBackToProducts: Locator;
  readonly txtProdTitle: Locator;
  readonly txtProdPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnBackToProducts = page.getByTestId("back-to-products");
    this.txtProdTitle = page.getByTestId("inventory-item-name");
    this.txtProdPrice = page.getByTestId("inventory-item-price");
  }

}
