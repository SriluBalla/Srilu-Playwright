import { test, expect } from '@playwright/test';

// Expected structure 
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

test.describe('JSONPlaceholder API Tests', () => {

    // Test 1: GET - Reading a list of resources
    test('should retrieve a list of posts', async ({ request }) => {
        // Using the base URL defined in the config + endpoint '/posts'
        const response = await request.get('/posts'); 
        
        // Assert: Status code is 200 OK
        expect(response.status()).toBe(200); 

        // Assert: Response body is valid JSON
        expect(response.ok()).toBeTruthy();

        const posts = await response.json() as Post[];

        // Assert: The response is an array and contains multiple items
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);
        
        // Assert: Check the structure of the first item
        expect(posts[0]).toHaveProperty('userId');
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
    });


    // Test 2: POST - Creating a new resource
    test('should successfully create a new post', async ({ request }) => {
        const newPostPayload = {
            title: 'Playwright API Test Post',
            body: 'This post was created during an API test.',
            userId: 99,
        };

        const response = await request.post('/posts', {
            data: newPostPayload,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Assert: Status code for successful creation is typically 201 Created
        expect(response.status()).toBe(201);
        
        const createdPost = await response.json() as Post;
        
        // Assert: The returned object contains the data we sent
        expect(createdPost.title).toBe(newPostPayload.title);
        expect(createdPost.body).toBe(newPostPayload.body);
        
        // Assert: The service assigned a new ID (for JSONPlaceholder, this is ID 101)
        expect(createdPost).toHaveProperty('id');
        expect(createdPost.id).toBe(101); // JSONPlaceholder always returns 101 for POSTs
    });

    
    // Test 3: DELETE - Removing a resource
    test('should successfully delete an existing post', async ({ request }) => {
        // Attempt to delete the resource at /posts/1
        const response = await request.delete('/posts/1');
        
        // Assert: Status code for successful deletion is typically 200 OK or 204 No Content
        expect(response.status()).toBeGreaterThanOrEqual(200);
        expect(response.status()).toBeLessThanOrEqual(204);
    });

});