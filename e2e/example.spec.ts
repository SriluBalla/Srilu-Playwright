import {test } from '@playwright/test';
import { Console } from 'console';

test("basic", async ({page}) => {
    console.log(process.env.URL);
    console.log(process.env.user_err);
})