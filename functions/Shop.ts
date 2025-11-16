// functions/Shop
import { expect , type Page } from "@playwright/test";
import { PageShop } from "../pages/Shop";
type Logger = (msg: string) => Promise<void>;

export class ShopFunctions {
  private readonly Shop: PageShop;
  readonly page: Page;
  private logger: Logger;

  constructor(Shop: PageShop, page: Page, logger: Logger) {
    this.page = page;
    this.Shop = Shop;
    this.logger = logger;
  }

  async loadsPageShop() {
    await expect(this.Shop.btnMenu).toBeVisible({ timeout: 1000 });
    await this.page.waitForURL("**/inventory.html", { timeout: 10000 });
    await this.logger("on Page Swag Products Inventory");
    await expect(this.Shop.hProducts).toBeVisible({ timeout: 100000 });
  }

  async clickProduct(name: string) {
    const item = this.Shop.product(name);
    await this.logger(`🛍️  item = ${name}`);

    await expect(item).toBeVisible();
    await item.click({ force: true });
    await this.logger(`🛍️ Clicked item: ${name}`);
  }
}
