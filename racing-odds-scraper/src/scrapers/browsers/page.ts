import { Page as PPage } from "puppeteer";
import { NoPageError } from "./browser-errors";

export abstract class Page {
  url: URL;
  page: PPage;

  constructor(url: URL) {
    this.url = url;
  }

  handleNoPage() {
    if (!this.page) throw new NoPageError("Page is being operated against w/o an underlying page object.");
  }

  async close() {
    this.handleNoPage();
    await this.page.close();
  }
}