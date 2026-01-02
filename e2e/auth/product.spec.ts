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
      
      await f.Browser.sizeDesktop();
      await f.Browser.goToURL('/inventory.html'); 
      
      await f.Shop.loadsPageShop();
      await f.Shop.clickProduct(name);

      await f.Element.waitForElemVisible(p.Product.txtProdTitle, 'Product Title');
      await f.Element.waitForElemVisible(p.Product.txtProdPrice, 'Product Price');
      await f.Element.waitForElemVisible(p.Product.btnBackToProducts, 'button Back To Products');

      await f.Element.textExists(p.Product.txtProdTitle, 'Product Title', name);
      await f.Element.textExists(p.Product.txtProdPrice, 'Product Price', `$${price}`);
      
      await log(`✅ Title and price matched: "${name}" at $${price}`);
      
      await f.img.wholePage(`Product_Details_${name.replace(/\s/g, '_')}`); 
      
      await f.Element.clickElem(p.Product.btnBackToProducts, 'button Back To Products');
    });
  });
});