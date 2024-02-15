import {test } from '@playwright/test';
import { SwagLogin } from '../pages/swagLogin';
import { SwagShop } from '../pages/swagShop';
import { getImage } from '../helper/getImage';

test.beforeEach(async ({ page }) => {

    await page.goto(process.env.URL!);
});

test.describe ('Login with various user types', () => {
 
    test('Empty fields --> Error message', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login('', '');
        await pSwagLogin.wrongUser('Epic sadface: Username is required')
        await image.wholePage('NoUser');
    });

    test('Error User --> No Error', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_err!, process.env.password!);
        await pSwagShop.cart.isVisible;
        await image.wholePage('ErrUser');

    });


    test('Locked Out User --> ', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_locked!, process.env.password!);
        await pSwagLogin.wrongUser('Epic sadface: Sorry, this user has been locked out.')
        await image.wholePage('LockedUser');
    });


    test('Performance Glitch User --> ', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_glitch!, process.env.password!);
        await pSwagShop.cart.isVisible;
        await image.wholePage('GlitchUser');
    });


    test('Problem User --> ', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_problem!, process.env.password!);
        await pSwagLogin.wrongUser('Srilu breaking the test')
        await image.wholePage('ProblemUser');
    });

    test('Visual User --> ', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_visual!, process.env.password!);
        await pSwagShop.cart.isVisible;
        await image.wholePage('VisualUser');
    });

    test('Standard User --> Login Successful', async ({page}) => {
        const pSwagLogin = new SwagLogin(page);
        const pSwagShop = new SwagShop(page);
        const image = new getImage(page);

        await pSwagLogin.logo.isVisible;
        await pSwagLogin.login(process.env.user_standard!, process.env.password!);
        await pSwagShop.cart.isVisible;
        await image.wholePage('StandardUser');
    });

    test('Wrap up ', async ({page}) => {
        await page.close();
    });

    
});