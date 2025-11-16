// functions/Login
import { expect, type Page } from "@playwright/test";
import { PageLogin } from "../pages/Login";
type Logger = (msg: string) => Promise<void>;

export class LoginFunctions {
  private readonly Login: PageLogin;
  private logger: Logger;
  readonly page: Page;

  constructor(Login: PageLogin, page: Page,  logger: Logger) {
    this.Login = Login;
    this.logger = logger;
    this.page = page;
  }

  async login(user: string, pass: string) {
    await this.Login.fUserName.fill(user);
    await this.Login.fPassword.fill(pass);
    await this.Login.btnLogin.click();
  }

  async wrongUser(errorTxt: string | RegExp) {
    await expect(this.Login.errLoginMsg).toBeVisible();
    await expect(this.Login.errLoginMsg).toHaveText(errorTxt);
    const textError = await this.Login.errLoginMsg.textContent();
    textError === errorTxt;
    expect(textError).toBe(errorTxt);

    await this.logger("Message Actual = " + textError);
    await this.logger("Message Expected = " + errorTxt);
  }
}
