// helper/fixtures.ts
import { test as base, expect, type TestInfo } from "@playwright/test";
import type { Page } from "@playwright/test";
import { allPages } from "../pages/allPages";
import { allFunctions } from "../functions/allFunctions";

type MyFixtures = {
  p: allPages;
  f: allFunctions;
  testInfo: TestInfo;
  log: (msg: string) => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  p: [
    async ({ page, testInfo }, use) => {
      const pages = new allPages(page, testInfo);
      await use(pages);
    },
    { scope: "test" },
  ],

  f: [
    async ({ p, log }, use) => {
      const functions = new allFunctions(p, log);
      await use(functions);
    },
    { scope: "test", auto: true },
  ],

  testInfo: [
    async ({}, use, testInfo) => {
      await use(testInfo);
    },
    { scope: "test", auto: true },
  ],

  log: [
    async ({}, use, testInfo) => {
      const lines: string[] = [];

      const logger = async (msg: string) => {
        console.log(msg); 
        lines.push(msg); 
        await base.step(msg, async () => {}); 
      };

      await use(logger);

      if (lines.length) {
        await testInfo.attach("run-log.txt", {
          contentType: "text/plain",
          body: lines.join("\n"),
        });
      }
    },
    { scope: "test" },
  ],
});

export { expect };
