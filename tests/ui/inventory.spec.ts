import { expect } from "@playwright/test";
import { test } from "../../fixtures";

test.describe("Inventory Suite", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigate("inventory.html");
  });

  /**
   * Scenario 1: Verify Inventory Items
   * 1. Login to site
   * 2. Verify that the inventory page displays exactly 6 items.
   */

  test("Verify the inventory page displays exactly 6 items", async ({
    inventoryPage,
  }) => {
    const expectedInventoryItems = 6;
    const actualInventoryItemsCount = await inventoryPage.getItemsCount();
    expect(actualInventoryItemsCount, {
      message:
        "All " +
        expectedInventoryItems +
        " items should be loaded sucessfully on the page",
    }).toEqual(expectedInventoryItems);
  });

  /**
   * Scenario 2: Add Item to Cart
   * 1. Login to site
   * 2. Add the first inventory item to the shopping cart.
   * 3. Verify that the cart badge correctly displays the number 1.
   */

  test("Verify the cart badge correctly displays the number 1", async ({
    inventoryPage,
  }) => {
    const itemName = await inventoryPage.addItemToCart(0);
    const actualCountBadgeItems =
      await inventoryPage.getShoppingCartBadgeItemsAmount();

    expect
      .soft(actualCountBadgeItems, {
        message: "Shopping cart badge should be 1",
      })
      .toEqual(1);

    const cartPage = await inventoryPage.openCart();
    await cartPage.navigate("cart.html");

    const cartItemsName = await cartPage.getCartItemsName();
    expect
      .soft(cartItemsName, `Cart should have item with name ${itemName}`)
      .toContain(itemName);
  });
});
