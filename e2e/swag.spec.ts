import {test } from '@playwright/test';
import { allPages } from '../pages/allPages';

test.beforeEach(async ({ page }) => {

    await page.goto(process.env.URL!);
});

test.describe ('Login with various user types', () => {
 
    test('Empty fields --> Error message', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login('', '');
        await p.SwagLogin.wrongUser('Epic sadface: Username is required')
        await p.img.wholePage('NoUser');
    });

    test('Error User --> No Error', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_err!, process.env.password!);
        await p.SwagShop.cart.isVisible;
        await p.img.wholePage('ErrUser');

    });


    test('Locked Out User --> Cant log in', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_locked!, process.env.password!);
        await p.SwagLogin.wrongUser('Epic sadface: Sorry, this user has been locked out.')
        await p.img.wholePage('LockedUser');
    });


    test('Performance Glitch User --> Take a long ass time to log in', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_glitch!, process.env.password!);
        await p.SwagShop.cart.isVisible;
        await p.img.wholePage('GlitchUser');
    });


    test.skip('Problem User --> Just failing a test because I can', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_problem!, process.env.password!);
        await p.SwagLogin.wrongUser('Srilu breaking the test')
        await p.img.wholePage('ProblemUser');
    });

    test('Visual User --> I did not see anything unusual', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_visual!, process.env.password!);
        await p.SwagShop.cart.isVisible;
        await p.img.wholePage('VisualUser');
    });

    test('Standard User --> YAY!! Logged in', async ({page}) => {
        const p = new allPages(page);

        await p.SwagLogin.logo.isVisible;
        await p.SwagLogin.login(process.env.user_standard!, process.env.password!);
        await p.SwagShop.cart.isVisible;
        await p.img.wholePage('StandardUser');
    });

    test('Wrap up ', async ({page}) => {
        await page.close();
    });

    
});