import { expect, Locator } from "@playwright/test";
type Logger = (msg: string) => Promise<void>;


export async function elemVisible(element: Locator, name: string, logger?: Logger, timeout = 5000) {
    try {
        await expect(element).toBeVisible({ timeout });
        logger && await logger(`✅ ${name} is visible`);
    } catch (error) {
        logger && await logger(`❌ ${name} is NOT visible`);
        throw new Error(`❌ ${name} is NOT visible`);
    }
}


export async function clickButton(element: Locator, name: string, logger?: Logger, timeout = 5000) {
    try {
        await element.click({ timeout });
        logger && await logger(`✅ Clicked Button ${name}`);
    } catch (error) {
        logger && await logger(`❌ Failed to click Button ${name}`);
        throw new Error(`❌ Failed to click Button ${name}`);
    }
}


export async function clickLink(element: Locator, name: string, logger?: Logger, timeout = 5000) {
    try {
        await element.click({ timeout });
        logger && await logger(`✅ Clicked Link ${name}`);
    } catch (error) {
        logger && await logger(`❌ Failed to click Link ${name}`);
        throw new Error(`❌ Failed to click Link ${name}`);
    }
}


export async function typeinField(element: Locator, name: string, text: string, logger?: Logger, timeout = 5000) {
    try {
        await element.fill(text, { timeout });
        const actualText = await element.inputValue();
        logger && await logger(`✅ Typed in ${name} the text: "${actualText}"`);
    } catch (error) {
        logger && await logger(`❌ Failed to type in ${name}`);
        throw new Error(`❌ Failed to type in ${name}`);
    }
}


export async function textExists(element: Locator, name: string, expectedText: string, logger?: Logger, timeout = 5000) {
    try {
        await expect(element).toHaveText(expectedText, { timeout });
        logger && await logger(`✅ Text "${expectedText}" exists in ${name}`);
    } catch (error) {
        logger && await logger(`❌ Text "${expectedText}" does NOT exist in ${name}`);
        throw new Error(`❌ Text "${expectedText}" does NOT exist in ${name}`);
    }


}


export async function elemHasAttribute(
    element: Locator,
    name: string,
    attribute: string,
    expectedValue: string | RegExp,
    logger?: Logger,
    timeout = 5000
) {
    try {
        await expect(element).toHaveAttribute(attribute, expectedValue, { timeout });
        logger && await logger(`✅ ${name} has attribute ${attribute} with value ${expectedValue}`);
    } catch (error) {
        logger && await logger(`❌ ${name} does NOT have attribute ${attribute} with value ${expectedValue}`);
        throw new Error(`❌ ${name} does NOT have attribute ${attribute} with value ${expectedValue}`);
    }
}


export async function safeMessage(message: string, logger?: Logger) {
    logger && await logger(message);
}  
