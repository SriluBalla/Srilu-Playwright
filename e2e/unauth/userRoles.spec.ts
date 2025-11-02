import { test, expect } from "../../helper/fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL!);
});

test.describe("Login with various user types", () => {
  test("Empty fields --> Error message", async ({ p, log }) => {
    await log("NoUser");
    await p.SwagLogin.logo.isVisible();
    await p.SwagLogin.login("", "");
    await p.SwagLogin.wrongUser("Epic sadface: Username is required");
    await p.img.wholePage("NoUser");
  });

  test("Error User --> No Error", async ({ p, log }) => {
    await log("ErrUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_err!, process.env.password!);
    p.SwagHome.iCart.isVisible;
    await p.img.wholePage("ErrUser");
  });

  test("Locked Out User --> Cant log in", async ({ p, log }) => {
    await log("LockedUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_locked!, process.env.password!);
    await p.SwagLogin.wrongUser(
      "Epic sadface: Sorry, this user has been locked out."
    );
    await p.img.wholePage("LockedUser");
  });

  test("Performance Glitch User --> Take a long ass time to log in", async ({
    p,
    log,
  }) => {
    await log("GlitchUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_glitch!, process.env.password!);
    p.SwagLogin.logo.isVisible;
    await p.img.wholePage("GlitchUser");
  });

  test.skip("Problem User --> Just failing a test to see it fails", async ({
    p,
    log,
  }) => {
    await log("ProblemUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_problem!, process.env.password!);
    await p.SwagLogin.wrongUser("Srilu breaking the test");
    await p.img.wholePage("ProblemUser");
  });

  test("Visual User --> I did not see anything unusual", async ({ p, log }) => {
    await log("VisualUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_visual!, process.env.password!);
    p.SwagLogin.logo.isVisible;
    await p.img.wholePage("VisualUser");
  });

  test("Standard User --> YAY!! Logged in again", async ({ p, log }) => {
    await log("StandardUser");
    p.SwagLogin.logo.isVisible;
    await p.SwagLogin.login(process.env.user_standard!, process.env.password!);
    p.SwagLogin.logo.isVisible;
    await p.img.wholePage("StandardUser");
  });
});
