// utils/networkDiscovery.ts

import { Page } from '@playwright/test';

// Function to find the base URL of the problematic server
export async function discoverExternalServerUrl(page: Page, urlPart: string): Promise<string | null> {
    console.log(`🔍 Navigating to find service using keyword: "${urlPart}"`);
    
    // 1. Listen for ALL network requests the page makes
    const requestPromise = page.waitForRequest(request => {
        // We are looking for any request URL that contains the identifying part
        // Example: 'old-application' or 'user-data-api'
        return request.url().includes(urlPart);
    }, { timeout: 30000 }); // Give it a long time to load

    // 2. Trigger the navigation that makes the request
    await page.goto('/'); 

    try {
        const request = await requestPromise;
        const fullUrl = new URL(request.url());
        
        // Return only the base URL (e.g., 'https://api.external.com')
        const baseUrl = `${fullUrl.protocol}//${fullUrl.host}`;
        console.log(`✅ Discovered URL for service: ${baseUrl}`);
        return baseUrl;
    } catch (error) {
        console.error(`❌ Could not find external service matching "${urlPart}" within the timeout.`);
        return null;
    }
}