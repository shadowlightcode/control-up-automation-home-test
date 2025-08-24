import BasePage from "./base-page";
import { type Page } from "@playwright/test";

export default class CartPage extends BasePage {
  private readonly cartItemName = ".inventory_item_name";

  constructor(page: Page) {
    super(page);
  }

  async getCartItemsName(): Promise<Array<string>> {
    return this.page.locator(this.cartItemName).allTextContents();
  }
}
