// utils/serverHealth.ts
import { request, APIRequestContext } from '@playwright/test';

export async function checkServerHealth(url: string, serverName: string) {

    const apiContext: APIRequestContext = await request.newContext({
        baseURL: url,
        timeout: 10000 
    });

    try {
        // Simple GET request
        const response = await apiContext.get('/'); 
        
        if (response.status() === 200) {
            console.log(`✅ ${serverName} is UP and responsive (Status 200).`);
            return true;
        } else {
            console.error(`❌ ${serverName} is UNHEALTHY. Status: ${response.status()}`);
            return false;
        }
    } catch (error) {
        // Network errors, DNS failure, etc.
        console.error(`❌ ${serverName} failed to respond. Error: ${error}`);
        return false;
    } finally {
        await apiContext.dispose();
    }
}