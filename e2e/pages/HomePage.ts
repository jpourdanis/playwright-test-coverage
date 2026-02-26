import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly currentColorText: Locator;
  readonly turquoiseBtn: Locator;
  readonly redBtn: Locator;
  readonly yellowBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("header");
    this.currentColorText = page.locator("text=Current color:");
    this.turquoiseBtn = page.locator("text=Turquoise");
    this.redBtn = page.locator("text=Red");
    this.yellowBtn = page.locator("text=Yellow");
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickColorButton(colorName: string) {
    await this.page.click(`text=${colorName}`);
  }

  async getCurrentColorText(): Promise<string | null> {
    return await this.currentColorText.textContent();
  }
}
