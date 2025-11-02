// db.setup.ts (Your own utility file)
import { Client } from 'pg'; // Example PostgreSQL driver

export async function clearUser(email: string) {
    const client = new Client();
    await client.connect();
    // This SQL runs directly from Node.js, not Playwright
    await client.query(`DELETE FROM users WHERE email = $1`, [email]); 
    await client.end();
}

// your.test.spec.ts (Your Playwright test file)
import { test } from '@playwright/test';
import { clearUser } from './dbconnect.ts'; 

test('user can complete purchase', async ({ page }) => {
    // 1. DATABASE SETUP (Precondition)
    await clearUser('test@example.com'); 
    
    // 2. PLAYWRIGHT ACTIONS (Test Execution)
    await page.goto('/signup');
    await page.fill('#email', 'test@example.com');
    await page.click('#submit');

    // 3. DATABASE VALIDATION (Post-Condition)
    // You would add another DB function call here to verify the user was created.
});