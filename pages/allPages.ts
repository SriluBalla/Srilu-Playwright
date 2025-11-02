// All Pages Data Functions
import { type Page, type TestInfo } from "@playwright/test"; // <-- Import TestInfo

import { getImage } from "../helper/getImage";
import { BrowserActions } from "../pages/browser";
import { SwagLoginPage } from "../pages/swagLogin";
import { SwagHomePage } from "../pages/swagHome";
import { SwagShopPage } from "../pages/swagShop";
import { SwagProductPage } from "../pages/swagProduct";

export class allPages {
  readonly page: Page;
  readonly img: getImage;
  readonly browser: BrowserActions;
  readonly testInfo: TestInfo;
  readonly SwagLogin: SwagLoginPage;
  readonly SwagHome: SwagHomePage;
  readonly SwagShop: SwagShopPage;
  readonly SwagProduct: SwagProductPage;

  // The constructor now accepts TestInfo
  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.img = new getImage(page, testInfo);
    this.browser = new BrowserActions(page);
    this.testInfo = testInfo;
    this.SwagLogin = new SwagLoginPage(page);
    this.SwagHome = new SwagHomePage(page);
    this.SwagShop = new SwagShopPage(page);
    this.SwagProduct = new SwagProductPage(page);
  }
}
