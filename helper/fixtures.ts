import { test as base, expect, type TestInfo } from '@playwright/test';
import type { Page } from '@playwright/test';
import { allPages } from '../pages/allPages';

type MyFixtures = {
  p: allPages;
  testInfo: TestInfo;
  log: (msg: string) => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  p: [async ({ page, testInfo }, use) => {
    const pages = new allPages(page, testInfo);
    await use(pages);
  }, { scope: 'test' }],

  testInfo: [async ({}, use, testInfo) => {
    await use(testInfo);
  }, { scope: 'test', auto: true }],

  // logger: creates a Playwright step AND attaches a run-log.txt at the end
  log: [async ({}, use, testInfo) => {
    const lines: string[] = [];

    const logger = async (msg: string) => {
      console.log(msg);                 // shows in terminal
      lines.push(msg);                  // saved for attachment
      await base.step(msg, async () => {}); // shows as a Step in HTML report
    };

    await use(logger);

    if (lines.length) {
      await testInfo.attach('run-log.txt', {
        contentType: 'text/plain',
        body: lines.join('\n'),
      });
    }
  }, { scope: 'test' }],
});

export { expect };
