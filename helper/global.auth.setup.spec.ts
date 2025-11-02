// helper/global.auth.setup.spec.ts
import { test } from "@playwright/test";

test("create auth storage", async ({ page }) => {
  

  await page.goto("/");
  await page.fill("#user-name", process.env.user_standard || "standard_user");
  await page.fill("#password", process.env.password || "secret_sauce");
  await page.click("#login-button");

  await page.waitForURL("**/inventory.html");
  await page.context().storageState({ path: '.auth/user.json' });
  console.log("✅ Auth storage SAVED ");
});
