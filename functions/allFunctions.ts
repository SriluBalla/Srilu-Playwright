// functions/allFunctions
import { allPages } from "../pages/allPages";
import { BrowserActions } from "./Browser";
import { getImage } from "../helper/getImage";
import { LoginFunctions } from "./Login";
import { ShopFunctions } from "./Shop";
import { ProductFunctions } from "./Product";

type Logger = (msg: string) => Promise<void>;

export class allFunctions {
  readonly browser: BrowserActions;
  readonly img: getImage;
  readonly Login: LoginFunctions;
  readonly Shop: ShopFunctions;
  readonly Product : ProductFunctions;

  constructor(pages: allPages, logger: Logger) {
    const page = pages.page;
    const testInfo = pages.testInfo;
    this.img = new getImage(page, testInfo);
    this.browser = new BrowserActions(page, logger);
    this.Login = new LoginFunctions(pages.Login, page, logger);
    this.Shop = new ShopFunctions(pages.Shop, page, logger);
    this.Product = new ProductFunctions(pages.Product, page, logger);
  }
}
