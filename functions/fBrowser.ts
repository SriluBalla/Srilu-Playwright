// functions/browser.ts 
import { Page, BrowserContext, expect, Locator } from "@playwright/test";

type Logger = (msg: string) => Promise<void>;

export class BrowserActions {
  private page: Page;
  private context: BrowserContext;
  private logger: Logger; 

  constructor(page: Page, logger: Logger) {
    this.page = page;
    this.context = page.context();
    this.logger = logger; 
  }

  // ---- NAVIGATION & VERIFICATION ----
  async winGoToURL(url: string) {
    await this.page.goto(url);
    await this.logger(`🌍 Navigated to: ${url}`); 
  }

  async winGetCurrentURL(): Promise<string> {
    const currentUrl = this.page.url();
    await this.logger(`🔗 Current URL is: ${currentUrl}`); 
    return currentUrl;
  }

  async winGoBack() {
    await this.page.goBack();
    await this.logger("🔙 Navigated back one page."); 
  }

  async winGoForward() {
    await this.page.goForward();
    await this.logger("➡️ Navigated forward one page."); 
  }
  
  async winRefresh() {
    await this.page.reload();
    await this.logger("🔄 Page refreshed.");
  }

  async winVerifyTitle(title: string) {
    await expect(this.page).toHaveTitle(/.*${title}.*/, {
      timeout: 5000,
    });
    await this.logger(`✅ Title verified to contain: '${title}'`);
  }

  async winWait(ms: number) {
    await this.page.waitForTimeout(ms);
    await this.logger(`⏳ Waited for ${ms}ms.`);
  }

  // ---- WINDOW / VIEWPORT SIZES ----
  async winSizeMax() {
    try {
      const session = await this.context.newCDPSession(this.page);
      const { windowId } = await session.send("Browser.getWindowForTarget");
      await session.send("Browser.setWindowBounds", {
        windowId,
        bounds: { windowState: "maximized" },
      });
      await this.logger("✅ Browser window maximized");
    } catch (err) {
      await this.logger( 
        "⚠️ Maximize not supported for this browser. Falling back to desktop viewport."
      );
      await this.winSizeDesktop();
    }
  }

  async winSizeDesktop() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.logger("🖥️ Desktop size 1920x1080 applied");
  }

  async winSizeTablet() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
    await this.logger("📱 Tablet size 1024x768 applied");
  }

  async winSizeMobile() {
    await this.page.setViewportSize({ width: 414, height: 896 }); 
    await this.logger("📲 Mobile size 414x896 applied");
  }

   // ---- Network calls ----
  async winNetworkCallsRequest() {
    this.page.on('request', request => {
      this.logger('Request: ' + request.url());
    });
  }

  async winNetworkCallsResponse() {
    this.page.on('response', response => {
      this.logger('Response: ' + response.url() + ' ' + response.status());
    });
  }

  // ---- COOKIES ----
   async winCookieGetAll() {
    const cookies = await this.context.cookies();
    await this.logger('Cookies: ' + JSON.stringify(cookies));
  }
  
  async winCookieAdd(name: string, value: string, domain: string) {
    await this.context.addCookies([
      { name, value, domain, path: "/", httpOnly: false, secure: false },
    ]);
    await this.logger(`🍪 Cookie added: ${name}=${value} for ${domain}`);
  }

  async winCookieRemove(name: string, domain: string) {
    const cookies = await this.context.cookies();
    const keep = cookies.filter(
      (c) => !(c.name === name && c.domain === domain)
    );
    await this.context.clearCookies();
    await this.context.addCookies(keep);
    await this.logger(`🧹 Cookie removed: ${name} for ${domain}`);
  }

  async winCookieDeleteAll() {
    await this.context.clearCookies();
    await this.logger("🗑️ All cookies deleted from context.");
  }

  // ---- TABS ----
  async winNewTab(url?: string) {
    const newPage = await this.context.newPage();
    if (url) await newPage.goto(url);
    await this.logger(`🆕 New tab opened${url ? ` → ${url}` : ""}`);
    return newPage;
  }

  async winSwitchTab(index: number) {
    const pages = this.context.pages();
    if (index < 0 || index >= pages.length) {
      throw new Error(
        `❌ Invalid tab index ${index}. Open tabs: ${pages.length}`
      );
    }
    const target = pages[index];
    await target.bringToFront();
    await this.logger(`🔀 Switched to tab #${index + 1}`);
    return target;
  }

  async winCloseTabs(keepFirst = true) {
    const pages = this.context.pages();
    const start = keepFirst ? 1 : 0;
    for (let i = start; i < pages.length; i++) {
      await pages[i].close();
    }
    await this.logger(
      keepFirst
        ? "🚪 Closed all extra tabs (kept first)."
        : "🚪 Closed all tabs."
    );
  }

  // ---- INTERACTIONS (Hover/Scroll/Files) ----
  async winHover(selector: string) {
    await this.page.hover(selector);
    await this.logger(`👆 Hovered over element: ${selector}`);
  }

  async winScrollBy(yDistance: number) {
    await this.page.evaluate((y) => window.scrollBy(0, y), yDistance);
    await this.logger(`⬇️ Scrolled page by ${yDistance} pixels.`);
  }

  async winScrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    await this.logger(`⬇️ Scrolled element into view: ${selector}`);
  }

  async winUploadFile(selector: string, filePath: string) {
    await this.page.locator(selector).setInputFiles(filePath);
    await this.logger(
      `📂 File uploaded successfully to ${selector} from ${filePath}`
    );
  }
}
