import { test, expect } from "../../helper/fixtures";
import productsData from "../../data/products.json" assert { type: "json" };

test.describe("Product Page", () => {
  test("Go to product page => Title and price match", async ({
    page,
    p,
    f,
    log,
  }) => {
    await page.goto("/inventory.html");
    await f.Shop.loadsPageShop();

    for (const product of productsData.products) {
      const { name, price } = product;
      await f.Shop.clickProduct(name);

      await expect(p.Product.txtProdTitle).toBeVisible({ timeout: 1000 });
      await expect(p.Product.txtProdPrice).toBeVisible({ timeout: 1000 });

      await f.img.wholePage(name);
      await expect(p.Product.txtProdTitle).toHaveText(name);
      await expect(p.Product.txtProdPrice).toHaveText(`$${price}`);
      await log(`🛍️ Product page for "${name}" matches = title and price`);

      await p.Product.btnBackToProducts.click();
      await f.Shop.loadsPageShop();
    }

    await log("Completed verification of all products");
  });
});
