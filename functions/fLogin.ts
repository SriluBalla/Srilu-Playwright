import { type Page } from "@playwright/test";
import { PageLogin } from "../pages/pLogin";
import { ElementHelper } from "./fElement";
import { BrowserActions } from "./fBrowser";

type Logger = (msg: string) => Promise<void> | void;

export class LoginFunctions {
  private readonly page: Page;
  private logger: Logger;
  private readonly loginPage: PageLogin;
  private readonly el: ElementHelper;
  private readonly browser: BrowserActions;
  

  constructor(
    loginPage: PageLogin, 
    el: ElementHelper, 
    browser: BrowserActions, 
    logger: Logger, 
    page: Page
  ) {
    this.loginPage = loginPage;
    this.el = el;
    this.browser = browser;
    this.logger = logger;
        this.page = page;
    
  }

  /**
   * Performs the login flow using wrapped element interactions
   */
  async login(user: string, pass: string) {
    await this.el.typeInField(this.loginPage.fUserName, "field Username", user);
    await this.el.typeInField(this.loginPage.fPassword, "field Password", pass);
    await this.el.clickElem(this.loginPage.btnLogin, "button Login");
  }

  /**
   * Verifies error messages for failed login attempts (e.g., Supabase "Invalid login credentials")
   */
  async wrongUser(errorTxt: string | RegExp) {
    // 1. Verify visibility using wrapped helper
    await this.el.elemVisible(this.loginPage.errLoginMsg, "Login Error Message");

    // 2. Verify text exists
    await this.el.textExists(this.loginPage.errLoginMsg, "Error Message Text", errorTxt);

    // 3. Use Safe helper to get the text for logging purposes
    const actualText = await this.el.getTextSafe(this.loginPage.errLoginMsg, "Error Message");

    if (this.logger) {
        await this.logger(`📊 Comparison: Expected [${errorTxt}] | Actual [${actualText}]`);
    }
  }
}