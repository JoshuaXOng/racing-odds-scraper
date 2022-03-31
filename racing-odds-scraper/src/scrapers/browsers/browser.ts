import { Browser as PBrowser } from "puppeteer";

export class Browser {
  browser: PBrowser;

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

  async addPage(url: URL) {
    const page = await this.browser.newPage();
    const response = await page.goto(url.toString());
    return response.ok();
  }

  async closePages(url: URL) {
    const pages = await this.browser.pages();
    const targetPages = pages.filter(p => p.url() === url.toString());
    await Promise.all(targetPages.map(tp => tp.close()));
  }
}