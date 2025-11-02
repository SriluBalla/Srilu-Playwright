import { expect, type Locator, type Page } from "@playwright/test";

export class SwagShopPage {
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

  async loadsPageShop() {
    await expect(this.btnMenu).toBeVisible({ timeout: 1000 });
    await this.page.waitForURL("**/inventory.html", { timeout: 10000 });
    console.log("on Page Swag Products Inventory");
    await expect(this.hProducts).toBeVisible({ timeout: 100000 });
  }

  async clickProduct(name: string) {
    const item = this.product(name);
    console.log(`🛍️  item = ${name}`);

    await expect(item).toBeVisible();
    await item.click({ force: true });
    console.log(`🛍️ Clicked item: ${name}`);
  }
}
