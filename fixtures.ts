import { test as base } from "@playwright/test";
import InventoryPage from "./web/pom/inventory-page";

export const test = base.extend<{
  inventoryPage: InventoryPage;
}>({
  /** @type { InventoryPage } */
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});
