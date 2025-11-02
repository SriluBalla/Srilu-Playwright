import { test, expect } from "../../helper/fixtures";
import productsData from "../../data/products.json";


test.describe("Product Page", () => {
  test("Go to product page => Title and price match", async ({
    page,
    p,
    log,
  }) => {
    await page.goto("/inventory.html");
    await p.SwagShop.loadsPageShop();

    for (const product of productsData.products) {
      const { name, price } = product;
      await p.SwagShop.clickProduct(name);

      await expect(p.SwagProduct.txtProdTitle).toBeVisible({ timeout: 1000 });
      await expect(p.SwagProduct.txtProdPrice).toBeVisible({ timeout: 1000 });

      await p.img.wholePage(name);
      await expect(p.SwagProduct.txtProdTitle).toHaveText(name);
      await expect(p.SwagProduct.txtProdPrice).toHaveText(`$${price}`);
      await log(`🛍️ Product page for "${name}" matches = title and price`);

      await p.SwagProduct.btnBackToProducts.click();
      await p.SwagShop.loadsPageShop();
    }

    await log("Completed verification of all products");
  });
});
