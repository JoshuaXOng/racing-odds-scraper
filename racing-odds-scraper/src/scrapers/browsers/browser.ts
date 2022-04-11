import { Browser as PBrowser } from "puppeteer";
import { puppeteerConstants } from "../scraper-constants";
import { Page } from "./page";

export class Browser {
  private driverBrowser: PBrowser;
  pages: Page[] = [];

  constructor(driverBrowser: PBrowser) {
    this.driverBrowser = driverBrowser;
  }

  async close() {
    await this.driverBrowser.close();
  }

  async getNumOpenedPages() {
    return (await this.driverBrowser.pages()).length;
  }

  async getOpenedPageUrls() {
    const pages = await this.driverBrowser.pages();
    return pages.map(page => page.url());
  }

  async getNumOpenedPagesPerUrl() {
    const urls = await this.getOpenedPageUrls();
    let urlsToPages = {};
    urls.forEach(u => {
      if (!Object.keys(urlsToPages).includes(u))
        urlsToPages = { ...urlsToPages, [u]: 1 };
      else
        urlsToPages[u] += 1;
    });
    return urlsToPages;
  }

  async addPage(page: Page) {
    this.pages.push(page);
    
    page.driverPage = await this.driverBrowser.newPage();
    page.driverPage.setUserAgent(puppeteerConstants.userAgents.header);
    const response = await page.driverPage.goto(page.sourceUrl.toString());
    return response.ok();
  }

  async closePages(url: URL) {
    await Promise.all(
      this.pages.map(async p => {
        if (p.sourceUrl.toString() === url.toString()) return await p.driverPage?.close();
      })
    );

    this.pages = this.pages.filter(p => p.sourceUrl.toString() !== url.toString());
  }
}