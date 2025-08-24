import { type Page, type Locator } from "@playwright/test";
import BasePage from "./base-page";
import CartPage from "./cart-page";

export default class InventoryPage extends BasePage {
  private readonly inventoryItem = ".inventory_item";
  private readonly inventoryItemName = ".inventory_item_name";
  private readonly shoppingCartBadge = ".shopping_cart_badge";

  constructor(page: Page) {
    super(page);
  }

  async getItemsCount(): Promise<number> {
    return this.page.locator(this.inventoryItem).count();
  }

  async addItemToCart(index: number): Promise<string | null> {
    const allInventoryItems = await this.getAllInventoryItems();

    if (allInventoryItems.length <= 0) {
      throw new Error("Inventory items were not found on the page.");
    }

    const selectedItem: Locator = allInventoryItems[index];

    if (!selectedItem) {
      throw new Error(`Item with ${index} does not exist.`);
    }

    const itemName: string =
      (await this.getItemName(selectedItem)) ?? "Item name was not catched";
    await this.clickAddToButtonCart(selectedItem);

    return itemName;
  }

  async getShoppingCartBadgeItemsAmount() {
    const count = await this.page.locator(this.shoppingCartBadge).innerText();
    return Number(count);
  }

  async openCart() {
    await this.page.locator(this.shoppingCartBadge).click();
    return new CartPage(this.page);
  }

  private async getAllInventoryItems(): Promise<Array<Locator>> {
    return this.page.locator(this.inventoryItem).all();
  }

  private async getItemName(item: Locator): Promise<string> {
    return item.locator(this.inventoryItemName).innerText();
  }

  private async clickAddToButtonCart(item: Locator): Promise<void> {
    await item.getByRole("button", { name: "Add to cart" }).click();
  }
}
