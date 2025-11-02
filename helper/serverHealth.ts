// utils/serverHealth.ts

import { request, APIRequestContext } from '@playwright/test';

// Function to check the health of a single server
export async function checkServerHealth(url: string, serverName: string) {
    // Create a temporary API context outside of a test fixture
    const apiContext: APIRequestContext = await request.newContext({
        baseURL: url,
        // Set a short timeout, as a health check should be fast
        timeout: 10000 
    });

    try {
        // Attempt a simple GET request
        const response = await apiContext.get('/'); 
        
        if (response.status() === 200) {
            console.log(`✅ ${serverName} is UP and responsive (Status 200).`);
            return true;
        } else {
            console.error(`❌ ${serverName} is UNHEALTHY. Status: ${response.status()}`);
            return false;
        }
    } catch (error) {
        // Catches network errors, DNS failure, etc.
        console.error(`❌ ${serverName} failed to respond. Error: ${error}`);
        return false;
    } finally {
        await apiContext.dispose();
    }
}