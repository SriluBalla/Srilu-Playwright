// serverCheck.ts
import { checkServerHealth } from './serverHealth'; 

async function globalSetup() {
    console.log("--- Starting Server Health Checks ---");
    
    const uiServerUp = await checkServerHealth(
        process.env.URL || 'http://localhost:3000', // Use your UI server URL
        'Primary UI Server'
    );

    const apiServerUp = await checkServerHealth(
        process.env.API_URL || 'https://jsonplaceholder.typicode.com', // Use your API server URL
        'External API Server'
    );

    // Add a check for the problematic 'Application' server if it's external
    // const oldAppServerUp = await checkServerHealth('http://oldapp.example.com/health', 'Old Application Server');


    if (!uiServerUp || !apiServerUp /* || !oldAppServerUp */) {
        throw new Error("One or more critical servers are DOWN. Aborting test run.");
    }

    console.log("--- All critical servers are healthy. Starting tests. ---");
}

export default globalSetup;