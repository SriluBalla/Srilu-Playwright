import { test, expect } from "../../helper/fixtures";
import productsData from "../../data/products.json" assert { type: "json" }; 

interface Product {
  name: string;
  price: number;
}
const products: Product[] = productsData.products;

test.describe("🛒 Product and Price (Data-Driven)", () => {
  
  products.forEach((product) => {
    const { name, price } = product;

    test(`🔍 Product exists with price: "${name}"`, async ({ p, f, log }) => {
      
      await log(`Starting verification for price: $${price}`);
      await f.Browser.winSizeMax();
      await f.Browser.winGoToURL('/inventory.html'); 
      await f.Shop.loadsPageShop();

      await f.Shop.clickProduct(name);

      await expect(p.Product.txtProdTitle).toBeVisible();
      await expect(p.Product.txtProdPrice).toBeVisible();

      await expect(p.Product.txtProdTitle).toHaveText(name);
      await expect(p.Product.txtProdPrice).toHaveText(`$${price}`);
      await log(`✅ Title and price matched: "${name}" at $${price}`);
      
      await f.img.wholePage(`Product_Details_${name.replace(/\s/g, '_')}`); 
      await p.Product.btnBackToProducts.click();
    });
  });
});