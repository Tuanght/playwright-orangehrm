import { test, expect } from '../fixtures/gatekeeper.fixture'
import { testDataCatalog, getTestDataSimple } from '../utils/JsonUtil';

test.use({ storageState: { cookies: [], origins: [] } });

const loginCases = testDataCatalog.loginCases;
type LoginCaseKey = keyof typeof loginCases;

const allKeys = Object.keys(loginCases) as LoginCaseKey[];

test.describe('Login - Cases', () => {

  for (const key of allKeys) {
    const { description, Flat } = loginCases[key];

    test(`${key}: ${description}`, { tag: `@${Flat}`}, async ({ loginPage }) => {
      
      const testData = getTestDataSimple('loginCases', key);

      await loginPage.goto()
      await loginPage.expectLoginPageVisible()
      await loginPage.login(testData.username, testData.password)
      if (Flat === "success") {
        await expect(loginPage.page).toHaveURL(new RegExp(testData.expectUrl))
        await expect(loginPage.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
      } else {
        if(testData.expectedLoginError === "Invalid credentials") {
          await loginPage.expectLoginErrorMessage()
        } else if (testData.expectedInputError === "Required") {
          await loginPage.expectInputErrorMessage(testData.username, testData.password)
        } 
      }
    });
  }
});