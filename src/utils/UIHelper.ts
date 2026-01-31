import {test, expect, Locator, Page } from '@playwright/test';

export async function stepClick(locator: Locator, description: string): Promise<void> {
    await test.step(`Clicking on ${description}`, async () => {
      await locator.click();
    });
}

export async function stepDbClick(locator: Locator, description: string): Promise<void> {
    await test.step(`Double clicking on ${description}`, async () => {
      await locator.dblclick();
    });
}

export async function stepCheck(locator: Locator, description: string): Promise<void> {
    await test.step(`Checking on ${description}`, async () => {
      await locator.check();
    });
}

export async function stepUnCheck(locator: Locator, description: string): Promise<void> {
    await test.step(`Unchecking on ${description}`, async () => {
      await locator.uncheck();
    });
}

export async function stepGoto(page: Page, URL: string, description: string): Promise<void> {
    await test.step(`Navigate to ${description}`, async () => {
      await page.goto(URL);
    });
}

export async function stepFill(locator: Locator, value: string, description: string): Promise<void> {
    await test.step(`Entering ${description} as ${value}`, async () => {
      await locator.fill(value);
    });
}

export async function stepExpectToHaveText(locator: Locator, value: string, description: string): Promise<void> {
    await test.step(`Expect ${description} to have text "${value}"`, async () => {
      await expect(locator).toHaveText(value)
    });
}

export async function stepExpectContainText(locator: Locator, value: string, description: string): Promise<void> {
    await test.step(`Expect ${description} to contain text "${value}"`, async () => {
      await expect(locator).toContainText(value)
    });
}

export async function stepExpectToHaveValue(locator: Locator, value: string, description: string): Promise<void> {
    await test.step(`Expect ${description} to have value ${value}`, async () => {
      await expect(locator).toHaveValue(value)
    });
}

export async function stepExpectToVisible(locator: Locator, description: string): Promise<void> {
    await test.step(`Expect ${description} to be visible`, async () => {
      await expect(locator).toBeVisible()
    });
}

export async function stepExpectToDisabled(locator: Locator, description: string): Promise<void> {
    await test.step(`Expect ${description} to be disabled`, async () => {
      await expect.soft(locator).toBeDisabled()
    });
}

export async function stepExpectContainUrl(page: Page, url: string, description: string): Promise<void> {
    await test.step(`Expect ${description} to contain url '${url}'`, async () => {
      await expect(page).toHaveURL(new RegExp(url))
    });
}

