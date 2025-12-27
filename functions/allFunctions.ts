// functions/allFunctions
import { allPages } from "../pages/allPages";
import { BrowserActions } from "./fBrowser";
import { getImage } from "../helper/getImage";
import { LoginFunctions } from "./fLogin";
import { ShopFunctions } from "./fShop";
import { ProductFunctions } from "./fProduct";
import { ComparePageFunction } from "./fComparePages";

type Logger = (msg: string) => Promise<void>;

export class allFunctions {
  readonly Browser: BrowserActions;
  readonly img: getImage;
  readonly Login: LoginFunctions;
  readonly Shop: ShopFunctions;
  readonly Product : ProductFunctions;
  readonly ComparePages: ComparePageFunction;

  constructor(pages: allPages, logger: Logger) {
    const page = pages.page;
    const testInfo = pages.testInfo;
    this.img = new getImage(page, testInfo);
    this.Browser = new BrowserActions(page, logger);
    this.Login = new LoginFunctions(pages.Login, page, logger);
    this.Shop = new ShopFunctions(pages.Shop, page, logger);
    this.Product = new ProductFunctions(pages.Product, page, logger);
    this.ComparePages = new ComparePageFunction(page, logger, testInfo);

  }
}
