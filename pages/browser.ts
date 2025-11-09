// pages/browser.ts
import { Page, BrowserContext, expect, Locator } from "@playwright/test";

export class BrowserActions {
  private page: Page;
  private context: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
  }

  // ---- NAVIGATION & VERIFICATION ----
  async winGoToURL(url: string) {
    await this.page.goto(url);
    console.log(`🌍 Navigated to: ${url}`);
  }

  async winGetCurrentURL(): Promise<string> {
    const currentUrl = this.page.url();
    console.log(`🔗 Current URL is: ${currentUrl}`);
    return currentUrl;
  }

  async winGoBack() {
    await this.page.goBack();
    console.log("🔙 Navigated back one page.");
  }

  async winGoForward() {
    await this.page.goForward();
    console.log("➡️ Navigated forward one page.");
  }

  async winRefresh() {
    await this.page.reload();
    console.log("🔄 Page refreshed.");
  }

  async winVerifyTitle(title: string) {
    await expect(this.page).toHaveTitle(/.*${title}.*/, {
      timeout: 5000,
    });
    console.log(`✅ Title verified to contain: '${title}'`);
  }

  async winWait(ms: number) {
    await this.page.waitForTimeout(ms);
    console.log(`⏳ Waited for ${ms}ms.`);
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
      console.log("✅ Browser window maximized");
    } catch (err) {
      console.warn(
        "⚠️ Maximize not supported for this browser. Falling back to desktop viewport."
      );
      await this.winSizeDesktop();
    }
  }

  async winSizeDesktop() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    console.log("🖥️ Desktop size 1920x1080 applied");
  }

  async winSizeTablet() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
    console.log("📱 Tablet size 1024x768 applied");
  }

  async winSizeMobile() {
    await this.page.setViewportSize({ width: 414, height: 896 }); // iPhone-ish
    console.log("📲 Mobile size 414x896 applied");
  }

  // ---- COOKIES ----
  async winCookieAdd(name: string, value: string, domain: string) {
    await this.context.addCookies([
      { name, value, domain, path: "/", httpOnly: false, secure: false },
    ]);
    console.log(`🍪 Cookie added: ${name}=${value} for ${domain}`);
  }

  async winCookieRemove(name: string, domain: string) {
    const cookies = await this.context.cookies();
    const keep = cookies.filter(
      (c) => !(c.name === name && c.domain === domain)
    );
    await this.context.clearCookies();
    await this.context.addCookies(keep);
    console.log(`🧹 Cookie removed: ${name} for ${domain}`);
  }

  async winCookieDeleteAll() {
    await this.context.clearCookies();
    console.log("🗑️ All cookies deleted from context.");
  }

  // ---- TABS ----
  async winNewTab(url?: string) {
    const newPage = await this.context.newPage();
    if (url) await newPage.goto(url);
    console.log(`🆕 New tab opened${url ? ` → ${url}` : ""}`);
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
    console.log(`🔀 Switched to tab #${index + 1}`);
    return target;
  }

  async winCloseTabs(keepFirst = true) {
    const pages = this.context.pages();
    const start = keepFirst ? 1 : 0;
    for (let i = start; i < pages.length; i++) {
      await pages[i].close();
    }
    console.log(
      keepFirst
        ? "🚪 Closed all extra tabs (kept first)."
        : "🚪 Closed all tabs."
    );
  }

  // ---- INTERACTIONS (Hover/Scroll/Files) ----
  async winHover(selector: string) {
    await this.page.hover(selector);
    console.log(`👆 Hovered over element: ${selector}`);
  }

  async winScrollBy(yDistance: number) {
    await this.page.evaluate((y) => window.scrollBy(0, y), yDistance);
    console.log(`⬇️ Scrolled page by ${yDistance} pixels.`);
  }

  async winScrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    console.log(`⬇️ Scrolled element into view: ${selector}`);
  }

  async winUploadFile(selector: string, filePath: string) {
    await this.page.locator(selector).setInputFiles(filePath);
    console.log(
      `📂 File uploaded successfully to ${selector} from ${filePath}`
    );
  }
}

// --- Exported functions for direct use in tests (simplified) ---
export const winSizeMax = async (page: Page) =>
  new BrowserActions(page).winSizeMax();
export const winSizeDesktop = async (page: Page) =>
  new BrowserActions(page).winSizeDesktop();
export const winSizeTablet = async (page: Page) =>
  new BrowserActions(page).winSizeTablet();
export const winSizeMobile = async (page: Page) =>
  new BrowserActions(page).winSizeMobile();

export const winCookieAdd = async (
  page: Page,
  name: string,
  value: string,
  domain: string
) => new BrowserActions(page).winCookieAdd(name, value, domain);
export const winCookieRemove = async (
  page: Page,
  name: string,
  domain: string
) => new BrowserActions(page).winCookieRemove(name, domain);
export const winCookieDeleteAll = async (page: Page) =>
  new BrowserActions(page).winCookieDeleteAll();

export const winNewTab = async (page: Page, url?: string) =>
  new BrowserActions(page).winNewTab(url);
export const winSwitchTab = async (page: Page, index: number) =>
  new BrowserActions(page).winSwitchTab(index);
export const winCloseTabs = async (page: Page, keepFirst = true) =>
  new BrowserActions(page).winCloseTabs(keepFirst);

export const winGoToURL = async (page: Page, url: string) =>
  new BrowserActions(page).winGoToURL(url);
export const winGetCurrentURL = async (page: Page) =>
  new BrowserActions(page).winGetCurrentURL();
export const winGoBack = async (page: Page) =>
  new BrowserActions(page).winGoBack();
export const winGoForward = async (page: Page) =>
  new BrowserActions(page).winGoForward();
export const winRefresh = async (page: Page) =>
  new BrowserActions(page).winRefresh();
export const winVerifyTitle = async (page: Page, title: string) =>
  new BrowserActions(page).winVerifyTitle(title);
export const winWait = async (page: Page, ms: number) =>
  new BrowserActions(page).winWait(ms);

export const winHover = async (page: Page, selector: string) =>
  new BrowserActions(page).winHover(selector);
export const winScrollBy = async (page: Page, yDistance: number) =>
  new BrowserActions(page).winScrollBy(yDistance);
export const winScrollToElement = async (page: Page, selector: string) =>
  new BrowserActions(page).winScrollToElement(selector);
export const winUploadFile = async (
  page: Page,
  selector: string,
  filePath: string
) => new BrowserActions(page).winUploadFile(selector, filePath);
