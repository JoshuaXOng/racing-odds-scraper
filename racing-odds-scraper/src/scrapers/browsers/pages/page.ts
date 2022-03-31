import { Page as PPage } from "puppeteer";

export abstract class Page {
  url: URL;
  page: PPage;

  constructor(url: URL) {
    this.url = url;
  }

  async close() {
    if (!this.page)
      console.log("Page is being closed w/o an underlying page object.");
    else
      await this.page.close();
  }
}