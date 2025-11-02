// pages/browser.ts
import { Page, BrowserContext } from '@playwright/test';

export class BrowserActions {
  private page: Page;
  private context: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
  }

  // ---- Window / viewport sizes ----
  async winSizeMax() {
    try {
      const session = await this.context.newCDPSession(this.page);
      const { windowId } = await session.send('Browser.getWindowForTarget');
      await session.send('Browser.setWindowBounds', {
        windowId,
        bounds: { windowState: 'maximized' },
      });
      console.log('✅ Browser window maximized');
    } catch (err) {
      console.warn('⚠️ Maximize not supported for this browser. Falling back to desktop viewport.');
      await this.winSizeDesktop();
    }
  }

  async winSizeDesktop() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    console.log('🖥️ Desktop size 1920x1080 applied');
  }

  async winSizeTablet() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
    console.log('📱 Tablet size 1024x768 applied');
  }

  async winSizeMobile() {
    await this.page.setViewportSize({ width: 414, height: 896 }); // iPhone-ish
    console.log('📲 Mobile size 414x896 applied');
  }

  // ---- Cookies ----
  async winCookieAdd(name: string, value: string, domain: string) {
    await this.context.addCookies([{ name, value, domain, path: '/', httpOnly: false, secure: false }]);
    console.log(`🍪 Cookie added: ${name}=${value} for ${domain}`);
  }

  async winCookieRemove(name: string, domain: string) {
    const cookies = await this.context.cookies();
    const keep = cookies.filter(c => !(c.name === name && c.domain === domain));
    await this.context.clearCookies();
    await this.context.addCookies(keep);
    console.log(`🧹 Cookie removed: ${name} for ${domain}`);
  }

  // ---- Tabs ----
  async winNewTab(url?: string) {
    const newPage = await this.context.newPage();
    if (url) await newPage.goto(url);
    console.log(`🆕 New tab opened${url ? ` → ${url}` : ''}`);
    return newPage;
  }

  async winSwitchTab(index: number) {
    const pages = this.context.pages();
    if (index < 0 || index >= pages.length) {
      throw new Error(`❌ Invalid tab index ${index}. Open tabs: ${pages.length}`);
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
    console.log(keepFirst ? '🚪 Closed all extra tabs (kept first).' : '🚪 Closed all tabs.');
  }
}

export const winSizeMax     = async (page: Page) => new BrowserActions(page).winSizeMax();
export const winSizeDesktop = async (page: Page) => new BrowserActions(page).winSizeDesktop();
export const winSizeTablet  = async (page: Page) => new BrowserActions(page).winSizeTablet();
export const winSizeMobile  = async (page: Page) => new BrowserActions(page).winSizeMobile();
export const winCookieAdd   = async (page: Page, name: string, value: string, domain: string) =>
  new BrowserActions(page).winCookieAdd(name, value, domain);
export const winCookieRemove = async (page: Page, name: string, domain: string) =>
  new BrowserActions(page).winCookieRemove(name, domain);
export const winNewTab      = async (page: Page, url?: string) => new BrowserActions(page).winNewTab(url);
export const winSwitchTab   = async (page: Page, index: number) => new BrowserActions(page).winSwitchTab(index);
export const winCloseTabs   = async (page: Page, keepFirst = true) => new BrowserActions(page).winCloseTabs(keepFirst);
