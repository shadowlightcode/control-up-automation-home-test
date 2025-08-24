import { test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.locator("#user-name").fill(process.env.STANDARD_USER_NAME ?? "");
  await page.locator("#password").fill(process.env.PASSWORD ?? "");
  await page.locator("#login-button").click();

  await page.waitForURL("inventory.html", { waitUntil: "networkidle" });
  await page.context().storageState({ path: authFile });
});
