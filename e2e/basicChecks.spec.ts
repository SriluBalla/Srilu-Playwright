// basicChecks.spec.ts (Final Working Solution)

import { test, expect } from '../helper/fixtures'; 
// The import line remains the same:
import * as urlData from '../data/urlData.json'; 

// Define the structure of the data for TypeScript
type UrlDataEntry = {
    path: string;
    elementSelector: string;
    screenshotName: string;
};

test.describe('Basic Page Checks and Screenshots', () => {

    // 💡 FIX: Access the default property of the imported JSON module
    const testData: UrlDataEntry[] = (urlData as any).default || urlData; 
    
    // The '(urlData as any).default || urlData' handles both environments:
    // 1. If wrapped: it uses .default
    // 2. If unwrapped (direct array): it uses the original urlData

    // 💡 Now, the loop correctly iterates over the array
    for (const data of testData) {
        
        test(`Verify Page: ${data.path}`, async ({ p, page, testInfo }) => { 
            
            await page.goto(data.path);
            await p.img.wholePage(data.screenshotName);
            const targetElement = page.locator(data.elementSelector);
            await expect(targetElement).toBeVisible({ timeout: 15000 }); 
            
            
            // await p.img.element(data.elementSelector, data.screenshotName + '_Element');

        });
    } 
});