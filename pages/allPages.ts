// pages/allPages
import { type Page, type TestInfo } from "@playwright/test";

import { PageLogin } from "./Login";
import { PageHome } from "./Home";
import { PageShop } from "./Shop";
import { PageProduct } from "./Product";

export class allPages {
  readonly page: Page;
  readonly testInfo: TestInfo;
  readonly Login: PageLogin;
  readonly Home: PageHome;
  readonly Shop: PageShop;
  readonly Product: PageProduct;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.Login = new PageLogin(page);
    this.Home = new PageHome(page);
    this.Shop = new PageShop(page);
    this.Product = new PageProduct(page);
  }
}
