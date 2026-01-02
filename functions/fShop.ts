// functions/Shop
import { expect, type Page } from "@playwright/test";
import { PageShop } from "../pages/pShop";
import { ElementHelper } from "./fElement";
import { BrowserActions } from "./fBrowser";
type Logger = (msg: string) => Promise<void>;

export class ShopFunctions {
  private readonly Shop: PageShop;
  private readonly el: ElementHelper;
  private readonly browser: BrowserActions;
  private logger: Logger;
  private page: Page;

  constructor(Shop: PageShop, page: Page, logger: Logger) {
    this.page = page;
    this.logger = logger;
    this.Shop = Shop;
    this.el = new ElementHelper(logger);
    this.browser = new BrowserActions(page, logger);
  }
  
  async loadsPageShop() {
    await this.page.waitForURL("**/inventory.html", { timeout: 100 });
    await this.el.waitForElemVisible(this.Shop.btnMenu, 'button Menu');
    await this.el.log("on Page Swag Products Inventory");
    await this.el.waitForElemVisible(this.Shop.hProducts, 'header Products');
  }

  async clickProduct(name: string) {
    const item = this.Shop.product(name);
    await this.el.log(`🛍️  item = ${name}`);

    await this.el.waitForElemVisible(item, `Product Item: ${name}`);
    await this.el.clickElem(item, `Product Item: ${name}`);
  }
}
