// functions/Product
import { expect, type Locator, type Page } from "@playwright/test";
import { PageProduct } from "../pages/Product";
type Logger = (msg: string) => Promise<void>;

export class ProductFunctions {
  private readonly Product: PageProduct;
  private logger: Logger;
  readonly page: Page;

  constructor(Product: PageProduct, page: Page, logger: Logger) {
    this.Product = Product;
    this.logger = logger;
    this.page = page;
  }

  async loadsPageProduct() {
    await expect(this.Product.btnBackToProducts).toBeVisible({
      timeout: 1000000,
    });

    await this.logger("on Page Products");
  }
}
