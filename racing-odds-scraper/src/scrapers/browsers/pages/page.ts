import { Page as PPage } from "puppeteer";

export abstract class Page {
  page: PPage;

  constructor(page: PPage) {
    this.page = page;
  }

  async close() {
    await this.page.close();
  }
}