import { expect, type Locator, type Page } from "@playwright/test";

export class SwagProductPage {
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

  async loadsPageProduct() {
    await expect(this.btnBackToProducts).toBeVisible({ timeout: 1000000 });

    console.log("on Page Action Items");
  }
}
