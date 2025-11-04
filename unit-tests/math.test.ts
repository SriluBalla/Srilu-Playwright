import { test, expect } from '@playwright/test';
// NOTE: We import 'test' and 'expect' from '@playwright/test' to ensure compatibility
// with the Playwright test runner and to avoid conflicts with other libraries like Vitest.

/**
 * Utility function to be tested.
 * @param a The first number.
 * @param b The second number.
 * @returns The sum of the two numbers.
 */
function add(a: number, b: number): number {
  return a + b;
}

/**
 * Utility function to be tested.
 * @param a The base number.
 * @param b The exponent number.
 * @returns The result of a raised to the power of b.
 */
function power(a: number, b: number): number {
    return Math.pow(a, b);
}

test.describe('Math Unit Tests', () => {

  test('should correctly add two positive integers', async () => {
    expect(add(5, 3)).toBe(8);
  });

  test('should handle adding a positive and a negative number', async () => {
    expect(add(-10, 5)).toBe(-5);
  });

  test('should correctly calculate powers', async () => {
    // 2^4 = 16
    expect(power(2, 4)).toBe(16);
    // 5^0 = 1
    expect(power(5, 0)).toBe(1);
  });

  // Example of using Playwright's built-in mocking (test.fn) for unit testing purposes
  test('should verify a mock function was called with correct arguments', async () => {
    // 1. Create a spy/mock function
    const mockCallback = test.fn((x) => x + 1);
    
    // 2. Execute the function
    mockCallback(10);
    mockCallback(20);
    
    // 3. Assertions using Playwright's expect
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith(10);
    expect(mockCallback).toHaveReturnedWith(11);
  });
});
