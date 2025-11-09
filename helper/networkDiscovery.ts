// utils/networkDiscovery.ts

import { Page } from '@playwright/test';

// Function to find the base URL of the server
export async function discoverExternalServerUrl(page: Page, urlPart: string): Promise<string | null> {
    console.log(`🔍 Navigating to find service using keyword: "${urlPart}"`);
    
    // 1. Listen for ALL network requests the page makes
    const requestPromise = page.waitForRequest(request => {
        return request.url().includes(urlPart);
    }, { timeout: 30000 }); // Give it a long time to load

    // 2. Trigger the navigation 
    await page.goto('/'); 

    try {
        const request = await requestPromise;
        const fullUrl = new URL(request.url());
        
        const baseUrl = `${fullUrl.protocol}//${fullUrl.host}`;
        console.log(`✅ Discovered URL for service: ${baseUrl}`);
        return baseUrl;
    } catch (error) {
        console.error(`❌ Could not find external service matching "${urlPart}" within the timeout.`);
        return null;
    }
}