// functions/Product
import { expect, type Locator, type Page } from "@playwright/test";
import { PageProduct } from "../pages/pProduct";
import { ElementHelper } from "./fElement";
import { BrowserActions } from "./fBrowser";
type Logger = (msg: string) => Promise<void>;

export class ProductFunctions {
  private logger: Logger;
  private page: Page;
  private readonly Product: PageProduct;
  private readonly el: ElementHelper;
  private readonly browser: BrowserActions;

  constructor(Product: PageProduct, page: Page, logger: Logger) {
    this.logger = logger;
    this.Product = Product;
    this.el = new ElementHelper(logger);
    this.browser = new BrowserActions(page, logger);
  }

  async loadsPageProduct() {
    await this.el.waitForElemVisible(this.Product.btnBackToProducts, 'button Back To Products');

    await this.logger("on Page Products");
  }
}
