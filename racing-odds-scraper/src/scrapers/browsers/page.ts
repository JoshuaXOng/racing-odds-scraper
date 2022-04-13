import { Page as PPage } from "puppeteer";
import { NoPageError } from "./browser-errors";

export abstract class Page {
  sourceUrl: URL;
  driverPage: PPage;

  constructor(sourceUrl: URL) {
    this.sourceUrl = sourceUrl;
  }

  handleNoDriverPage() {
    if (!this.driverPage) throw new NoPageError("Page is being operated against w/o an underlying page object.");
  }

  async getCurrentDate() {
    return await this.driverPage.evaluate(() => new Date());
  }

  async close() {
    this.handleNoDriverPage();
    await this.driverPage.close();
  }
}