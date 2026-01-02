import { test, expect } from "../../helper/fixtures";

test.beforeEach(async ({ f }) => {
  await f.Browser.goToURL(process.env.URL!);
});

test.describe("RBAC", () => {
  test.only("Empty fields --> Error message", async ({ p, f, log }) => {
    await log("Login with no user = No Credentials");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login("", "");
    await f.Login.wrongUser("Epic sadface: Username is required");
    await f.img.wholePage("NoUser");
  });

  test("Error User --> No Error", async ({ p, f, log }) => {
    await log("ErrUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_err!, process.env.password!);
    p.Home.iCart.isVisible;
    await f.img.wholePage("ErrUser");
  });

  test("Locked Out User --> Cant log in", async ({ p, f,log }) => {
    await log("LockedUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_locked!, process.env.password!);
    await f.Login.wrongUser(
      "Epic sadface: Sorry, this user has been locked out."
    );
    await f.img.wholePage("LockedUser");
  });

  test("Performance Glitch User --> Take a long ass time to log in", async ({
    p, f,
    log,
  }) => {
    await log("GlitchUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_glitch!, process.env.password!);
    p.Login.logoSwag.isVisible;
    await f.img.wholePage("GlitchUser");
  });

  test("Problem User --> Just failing a test to see it fails", async ({
    p, f,
    log,
  }) => {
    await log("ProblemUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_problem!, process.env.password!);
    await f.Login.wrongUser("Srilu breaking the test");
    await f.img.wholePage("ProblemUser");
  });

  test("Visual User --> I did not see anything unusual", async ({ p, f, log }) => {
    await log("VisualUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_visual!, process.env.password!);
    p.Login.logoSwag.isVisible;
    await f.img.wholePage("VisualUser");
  });

  test("Standard User --> YAY!! Logged in again", async ({ p, f, log }) => {
    await log("StandardUser");
    await f.Element.waitForElemVisible(p.Login.btnLogin, 'button Login');
    await f.Login.login(process.env.user_standard!, process.env.password!);
    f.Product.loadsPageProduct();
    await f.img.wholePage("StandardUser");
  });
});
