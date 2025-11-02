// globalSetup.ts
import { checkServerHealth } from './serverHealth'; 

async function globalSetup() {
    console.log("--- Starting Server Health Checks ---");
    
    // Check the primary UI server (using the base URL from your config)
    const uiServerUp = await checkServerHealth(
        process.env.URL || 'http://localhost:3000', // Use your UI server URL
        'Primary UI Server'
    );

    // Check the API server (using the base URL from your API project)
    const apiServerUp = await checkServerHealth(
        process.env.API_URL || 'https://jsonplaceholder.typicode.com', // Use your API server URL
        'External API Server'
    );

    // Add a check for the problematic 'Old Application' server if it's external
    // const oldAppServerUp = await checkServerHealth('http://oldapp.example.com/health', 'Old Application Server');


    if (!uiServerUp || !apiServerUp /* || !oldAppServerUp */) {
        // If any critical server is down, throw an error to fail the entire run
        throw new Error("One or more critical servers are DOWN. Aborting test run.");
    }

    console.log("--- All critical servers are healthy. Starting tests. ---");
}

export default globalSetup;