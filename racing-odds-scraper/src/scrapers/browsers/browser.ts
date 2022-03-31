import { Browser as PBrowser } from "puppeteer";
import { Page } from "./page";

export class Browser {
  private browser: PBrowser;
  pages: Page[] = [];

  constructor(browser: PBrowser) {
    this.browser = browser;
  }

  async close() {
    await this.browser.close();
  }

  async numOpenedPages() {
    return (await this.browser.pages()).length;
  }

  async openedPagesUrl() {
    const pages = await this.browser.pages();
    return pages.map(page => page.url());
  }

  async numOpenedPagesPerUrl() {
    const urls = await this.openedPagesUrl();
    let urlToPagesMap = {};
    urls.forEach(u => {
      if (!Object.keys(urlToPagesMap).includes(u))
        urlToPagesMap = { ...urlToPagesMap, [u]: 1 };
      else
        urlToPagesMap[u] += 1;
    });
    return urlToPagesMap;
  }

  async addPage(page: Page) {
    this.pages.push(page);
    
    page.page = await this.browser.newPage();
    const response = await page.page.goto(page.url.toString());
    return response.ok();
  }

  async closePages(url: URL) {
    await Promise.all(
      this.pages.map(async p => {
        if (p.url.toString() === url.toString()) return await p.page?.close();
      })
    );

    this.pages = this.pages.filter(p => p.url.toString() !== url.toString());
  }
}